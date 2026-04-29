"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

type CopyVaultButtonProps = {
  vaultId: string;
  isLoggedIn: boolean;
  compact?: boolean;
};

type SourceVault = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
};

type SourceEntry = {
  id: string;
  title: string;
  url: string | null;
  description: string | null;
  notes?: string | null;
  type?: string | null;
};

export default function CopyVaultButton({ vaultId, isLoggedIn, compact = false }: CopyVaultButtonProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isCopying, setIsCopying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function copyVault() {
    setError(null);

    if (!isLoggedIn) {
      router.push(`/login?next=/explore&copyVault=${vaultId}`);
      return;
    }

    setIsCopying(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push(`/login?next=/explore&copyVault=${vaultId}`);
        return;
      }

      const { data: sourceVault, error: sourceVaultError } = await supabase
        .from("vaults")
        .select("id,title,description,category")
        .eq("id", vaultId)
        .eq("is_public", true)
        .single<SourceVault>();

      if (sourceVaultError || !sourceVault) {
        throw new Error("Could not find this public vault.");
      }

      const { data: newVault, error: newVaultError } = await supabase
        .from("vaults")
        .insert({
          user_id: user.id,
          title: `${sourceVault.title} (Copy)`,
          description: sourceVault.description,
          category: sourceVault.category,
          is_public: false,
        })
        .select("id")
        .single<{ id: string }>();

      if (newVaultError || !newVault) {
        throw new Error("Could not copy this vault.");
      }

      const { data: sourceEntries, error: entriesError } = await supabase
        .from("entries")
        .select("id,title,url,description,notes,type")
        .eq("vault_id", vaultId)
        .returns<SourceEntry[]>();

      if (entriesError) {
        throw new Error("Could not copy the vault entries.");
      }

      if (sourceEntries?.length) {
        const { data: copiedEntries, error: copiedEntriesError } = await supabase
          .from("entries")
          .insert(
            sourceEntries.map((entry) => ({
              vault_id: newVault.id,
              user_id: user.id,
              title: entry.title,
              url: entry.url,
              description: entry.description,
              notes: entry.notes ?? null,
              type: entry.type ?? "link",
            })),
          )
          .select("id,title")
          .returns<{ id: string; title: string }[]>();

        if (copiedEntriesError) {
          throw new Error("The vault copied, but entries could not be copied.");
        }

        // Tag copy is best-effort. If your schema differs, the vault and entries will still copy.
        const sourceEntryIds = sourceEntries.map((entry) => entry.id);
        const { data: sourceEntryTags } = await supabase
          .from("entry_tags")
          .select("entry_id,tag_id")
          .in("entry_id", sourceEntryIds);

        if (sourceEntryTags?.length && copiedEntries?.length) {
          const sourceToCopiedEntryId = new Map<string, string>();
          sourceEntries.forEach((sourceEntry) => {
            const copiedEntry = copiedEntries.find((entry) => entry.title === sourceEntry.title);
            if (copiedEntry) sourceToCopiedEntryId.set(sourceEntry.id, copiedEntry.id);
          });

          const copiedEntryTags = sourceEntryTags
            .map((entryTag) => ({
              entry_id: sourceToCopiedEntryId.get(entryTag.entry_id),
              tag_id: entryTag.tag_id,
            }))
            .filter((entryTag) => Boolean(entryTag.entry_id));

          if (copiedEntryTags.length) {
            await supabase.from("entry_tags").insert(copiedEntryTags);
          }
        }
      }

      router.push(`/vaults/${newVault.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong copying this vault.");
    } finally {
      setIsCopying(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={copyVault}
        disabled={isCopying}
        className={`inline-flex w-full items-center justify-center rounded-xl bg-slate-950 font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 ${
          compact ? "px-4 py-2.5 text-sm" : "px-4 py-3 text-sm"
        }`}
      >
        {isCopying ? "Copying..." : "⭐ Copy Vault"}
      </button>
      {error ? <p className="mt-2 text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
