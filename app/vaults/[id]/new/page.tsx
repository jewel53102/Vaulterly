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

    const { error: insertError } = await supabase.from("entries").insert({
      vault_id: vaultId,
      user_id: user.id,
      title: title.trim(),
      url: url.trim() || null,
      notes: notes.trim() || null,
    });

    if (insertError) {
      setErrorMessage(insertError.message);
      setIsSaving(false);
      return;
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