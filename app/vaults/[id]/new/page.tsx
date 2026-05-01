"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AppHeader from "@/app/components/AppHeader";
import { createClient } from "@/app/lib/supabase/client";

export default function NewEntryPage() {
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();

  const vaultId = params.id as string;

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsSaving(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You must be logged in to add an entry.");
      setIsSaving(false);
      return;
    }

    const { data: newEntry, error: insertError } = await supabase
      .from("entries")
      .insert({
        vault_id: vaultId,
        user_id: user.id,
        title: title.trim(),
        url: url.trim() || null,
        notes: notes.trim() || null,
      })
      .select("id")
      .single();

    if (insertError || !newEntry) {
      setErrorMessage(insertError?.message || "Could not create entry.");
      setIsSaving(false);
      return;
    }

    const cleanedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (cleanedTags.length > 0) {
      for (const tagName of cleanedTags) {
        const { data: existingTag, error: existingTagError } = await supabase
          .from("tags")
          .select("id")
          .eq("user_id", user.id)
          .eq("name", tagName)
          .maybeSingle();

        if (existingTagError) {
          setErrorMessage(existingTagError.message);
          setIsSaving(false);
          return;
        }

        let tagId = existingTag?.id;

        if (!tagId) {
          const { data: createdTag, error: tagError } = await supabase
            .from("tags")
            .insert({
              user_id: user.id,
              name: tagName,
            })
            .select("id")
            .single();

          if (tagError || !createdTag) {
            setErrorMessage(tagError?.message || "Could not create tag.");
            setIsSaving(false);
            return;
          }

          tagId = createdTag.id;
        }

        const { error: entryTagError } = await supabase
          .from("entry_tags")
          .insert({
            entry_id: newEntry.id,
            tag_id: tagId,
          });

        if (entryTagError) {
          setErrorMessage(entryTagError.message);
          setIsSaving(false);
          return;
        }
      }
    }

    router.push(`/vaults/${vaultId}`);
    router.refresh();
  }

  return (
    <>
      <AppHeader />

      <main className="vault-page">
        <div className="vault-container-narrow">
          <div className="vault-topbar">
            <Link href={`/vaults/${vaultId}`} className="vault-button-secondary">
              ← Back to vault
            </Link>
          </div>

          <section className="vault-card">
            <div className="vault-badge">New Entry</div>

            <h1 className="vault-heading">Add something worth keeping</h1>

            <p className="vault-body">
              Save a link, note, tool, article, research source, idea, or resource
              so you can find and use it again later.
            </p>
          </section>

          <form onSubmit={handleSubmit} className="vault-card">
            {errorMessage && <div className="vault-error">{errorMessage}</div>}

            <Field
              label="Entry title"
              help="Give this entry a clear name so it is easy to recognize later."
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Example: Research source for my paper"
                className="vault-input"
              />
            </Field>

            <Field
              label="URL"
              help="Optional, but useful for links, articles, tools, and online resources."
            >
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="vault-input"
              />
            </Field>

            <Field
              label="Tags"
              help="Optional. Separate tags with commas, like: Research, Writing, School"
            >
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Research, Writing, School"
                className="vault-input"
              />
            </Field>

            <Field
              label="Notes"
              help="Add context now so this is still useful when you come back to it."
            >
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={7}
                placeholder="Why are you saving this? How will you use it later?"
                className="vault-textarea"
              />
            </Field>

            <div className="vault-actions">
              <Link href={`/vaults/${vaultId}`} className="vault-button-secondary">
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSaving || !title.trim()}
                className="vault-button-primary"
              >
                {isSaving ? "Saving entry..." : "Save entry"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  help,
  children,
}: {
  label: string;
  help: string;
  children: React.ReactNode;
}) {
  return (
    <div className="vault-field">
      <label className="vault-label">{label}</label>
      {children}
      <p className="vault-help">{help}</p>
    </div>
  );
}