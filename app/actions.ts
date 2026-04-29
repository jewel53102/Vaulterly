"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type SourceEntry = {
  id: string;
  title: string | null;
  url: string | null;
  description: string | null;
  type: string | null;
  entry_tags?: {
    tags?: { name: string }[] | { name: string } | null;
  }[];
};

function getTagNames(entry: SourceEntry): string[] {
  return (
    entry.entry_tags
      ?.flatMap((entryTag) => {
        const tags = entryTag.tags;
        if (!tags) return [];

        if (Array.isArray(tags)) {
          return tags.map((tag) => tag.name).filter(Boolean);
        }

        return tags.name ? [tags.name] : [];
      })
      .filter(Boolean) ?? []
  );
}

export async function duplicatePublicVault(formData: FormData) {
  const vaultId = String(formData.get("vaultId") || "");

  if (!vaultId) {
    throw new Error("Missing vault ID.");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: sourceVault, error: vaultError } = await supabase
    .from("vaults")
    .select(
      `
      id,
      name,
      title,
      description,
      category,
      is_public,
      user_id,
      entries (
        id,
        title,
        url,
        description,
        type,
        entry_tags (
          tags (
            name
          )
        )
      )
    `
    )
    .eq("id", vaultId)
    .single();

  if (vaultError || !sourceVault) {
    throw new Error("Vault not found.");
  }

  const canDuplicate =
    sourceVault.is_public === true || sourceVault.user_id === user.id;

  if (!canDuplicate) {
    throw new Error("You do not have permission to duplicate this vault.");
  }

  const sourceVaultName =
    sourceVault.name?.trim() ||
    sourceVault.title?.trim() ||
    "Copied Vault";

  const { data: newVault, error: newVaultError } = await supabase
    .from("vaults")
    .insert({
      user_id: user.id,
      name: `${sourceVaultName} Copy`,
      title: `${sourceVaultName} Copy`,
      description: sourceVault.description,
      category: sourceVault.category,
      is_public: false,
    })
    .select("id")
    .single();

  if (newVaultError || !newVault) {
    throw new Error("Could not create duplicated vault.");
  }

  const sourceEntries = (sourceVault.entries ?? []) as SourceEntry[];

  for (const entry of sourceEntries) {
    const { data: newEntry, error: entryError } = await supabase
      .from("entries")
      .insert({
        user_id: user.id,
        vault_id: newVault.id,
        title: entry.title,
        url: entry.url,
        description: entry.description,
        type: entry.type || "link",
      })
      .select("id")
      .single();

    if (entryError || !newEntry) {
      throw new Error("Could not duplicate one of the vault entries.");
    }

    const tagNames = getTagNames(entry);

    for (const tagName of tagNames) {
      const cleanTagName = tagName.trim();

      if (!cleanTagName) continue;

      let tagId: string | null = null;

      const { data: existingTag } = await supabase
        .from("tags")
        .select("id")
        .eq("user_id", user.id)
        .eq("name", cleanTagName)
        .maybeSingle();

      if (existingTag?.id) {
        tagId = existingTag.id;
      } else {
        const { data: createdTag, error: tagError } = await supabase
          .from("tags")
          .insert({
            user_id: user.id,
            name: cleanTagName,
          })
          .select("id")
          .single();

        if (tagError || !createdTag) {
          continue;
        }

        tagId = createdTag.id;
      }

      if (tagId) {
        await supabase.from("entry_tags").insert({
          entry_id: newEntry.id,
          tag_id: tagId,
        });
      }
    }
  }

  redirect(`/vaults/${newVault.id}`);
}