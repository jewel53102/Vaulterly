"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AppHeader from "@/app/components/AppHeader";
import { createClient } from "@/app/lib/supabase/client";

export default function EditEntryPage() {
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();

  const entryId = params.entryId as string;

  const [vaultId, setVaultId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadEntry() {
      setIsLoading(true);
      setErrorMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setErrorMessage("You must be logged in to edit this entry.");
        setIsLoading(false);
        return;
      }

      const { data: entry, error: entryError } = await supabase
        .from("entries")
        .select("*")
        .eq("id", entryId)
        .eq("user_id", user.id)
        .single();

      if (entryError || !entry) {
        setErrorMessage(
          "Entry not found or you do not have permission to edit it."
        );
        setIsLoading(false);
        return;
      }

      setVaultId(entry.vault_id);
      setTitle(entry.title || "");
      setUrl(entry.url || "");
      setNotes(entry.notes || "");
      setIsLoading(false);
    }

    loadEntry();
  }, [entryId, supabase]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsSaving(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You must be logged in to update this entry.");
      setIsSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("entries")
      .update({
        title: title.trim(),
        url: url.trim() || null,
        notes: notes.trim() || null,
      })
      .eq("id", entryId)
      .eq("user_id", user.id);

    if (updateError) {
      setErrorMessage(updateError.message);
      setIsSaving(false);
      return;
    }

    router.push(vaultId ? `/vaults/${vaultId}` : "/dashboard");
    router.refresh();
  }

  async function handleDeleteEntry() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this entry? This cannot be undone."
    );

    if (!confirmed) return;

    setErrorMessage("");
    setIsDeleting(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You must be logged in to delete this entry.");
      setIsDeleting(false);
      return;
    }

    const { error: deleteError } = await supabase
      .from("entries")
      .delete()
      .eq("id", entryId)
      .eq("user_id", user.id);

    if (deleteError) {
      setErrorMessage(deleteError.message);
      setIsDeleting(false);
      return;
    }

    router.push(vaultId ? `/vaults/${vaultId}` : "/dashboard");
    router.refresh();
  }

  if (isLoading) {
    return (
      <>
        <AppHeader />

        <main className="vault-page">
          <div className="vault-container-narrow">
            <section className="vault-card">
              <p className="vault-body">Loading entry...</p>
            </section>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader />

      <main className="vault-page">
        <div className="vault-container-narrow">
          <div className="vault-topbar">
            <Link
              href={vaultId ? `/vaults/${vaultId}` : "/dashboard"}
              className="vault-button-secondary"
            >
              ← Back to vault
            </Link>
          </div>

          <section className="vault-card">
            <div className="vault-badge">Edit Entry</div>

            <h1 className="vault-heading">Update saved item</h1>

            <p className="vault-body">
              Edit the title, link, or notes for this saved entry.
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
              help="Add context so this entry is useful when you come back to it."
            >
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={7}
                placeholder="Why did you save this? How will you use it later?"
                className="vault-textarea"
              />
            </Field>

            <div className="vault-actions">
              <button
                type="button"
                onClick={handleDeleteEntry}
                disabled={isDeleting || isSaving}
                className="vault-button-danger"
              >
                {isDeleting ? "Deleting..." : "Delete entry"}
              </button>

              <div className="vault-actions-right">
                <Link
                  href={vaultId ? `/vaults/${vaultId}` : "/dashboard"}
                  className="vault-button-secondary"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSaving || isDeleting || !title.trim()}
                  className="vault-button-primary"
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
              </div>
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