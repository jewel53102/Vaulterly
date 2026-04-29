import { SupabaseClient } from "@supabase/supabase-js";

export function parseTags(input: string): string[] {
  return [...new Set(
    input
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
  )];
}

export async function upsertTagsForEntry({
  supabase,
  userId,
  entryId,
  tagNames,
}: {
  supabase: SupabaseClient;
  userId: string;
  entryId: string;
  tagNames: string[];
}) {
  // Clear existing links first
  await supabase.from("entry_tags").delete().eq("entry_id", entryId);

  if (tagNames.length === 0) return;

  const tagIds: string[] = [];

  for (const name of tagNames) {
    const { data: existingTag } = await supabase
      .from("tags")
      .select("id")
      .eq("user_id", userId)
      .ilike("name", name)
      .maybeSingle();

    if (existingTag?.id) {
      tagIds.push(existingTag.id);
      continue;
    }

    const { data: newTag, error: insertTagError } = await supabase
      .from("tags")
      .insert({
        user_id: userId,
        name,
      })
      .select("id")
      .single();

    if (insertTagError) {
      throw new Error(insertTagError.message);
    }

    if (newTag?.id) {
      tagIds.push(newTag.id);
    }
  }

  const links = tagIds.map((tagId) => ({
    entry_id: entryId,
    tag_id: tagId,
  }));

  const { error: linkError } = await supabase.from("entry_tags").insert(links);

  if (linkError) {
    throw new Error(linkError.message);
  }
}