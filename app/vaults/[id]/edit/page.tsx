"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AppHeader from "@/app/components/AppHeader";
import { createClient } from "@/app/lib/supabase/client";

export default function EditVaultPage() {
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();

  const vaultId = params.id as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [entryCount, setEntryCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadVault() {
      setIsLoading(true);
      setErrorMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setErrorMessage("You must be logged in to edit this vault.");
        setIsLoading(false);
        return;
      }

      const { data: vault, error: vaultError } = await supabase
        .from("vaults")
        .select("*")
        .eq("id", vaultId)
        .eq("user_id", user.id)
        .single();

      if (vaultError || !vault) {
        setErrorMessage(
          "Vault not found or you do not have permission to edit it."
        );
        setIsLoading(false);
        return;
      }

      const { count, error: countError } = await supabase
        .from("entries")
        .select("*", { count: "exact", head: true })
        .eq("vault_id", vaultId);

      if (countError) {
        setErrorMessage(countError.message);
        setIsLoading(false);
        return;
      }

      setName(vault.name || vault.title || "");
      setDescription(vault.description || "");
      setCategory(vault.category || "");
      setIsPublic(Boolean(vault.is_public));
      setEntryCount(count || 0);
      setIsLoading(false);
    }

    loadVault();
  }, [supabase, vaultId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsSaving(true);

    const cleanName = name.trim();
    const cleanDescription = description.trim();

    if (!cleanName) {
      setErrorMessage("Vault name is required.");
      setIsSaving(false);
      return;
    }

    if (isPublic && entryCount < 3) {
      setErrorMessage(
        `Add at least 3 saved entries before making this vault public. You currently have ${entryCount}.`
      );
      setIsSaving(false);
      return;
    }

    if (isPublic && !cleanDescription) {
      setErrorMessage(
        "Public vaults need a description so others understand what they contain."
      );
      setIsSaving(false);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You must be logged in to update this vault.");
      setIsSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("vaults")
      .update({
        name: cleanName,
        title: cleanName,
        description: cleanDescription || null,
        category: category.trim() || null,
        is_public: isPublic,
      })
      .eq("id", vaultId)
      .eq("user_id", user.id);

    if (updateError) {
      setErrorMessage(updateError.message);
      setIsSaving(false);
      return;
    }

    router.push(`/vaults/${vaultId}`);
    router.refresh();
  }

  async function handleDeleteVault() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vault? This will also delete the saved entries inside it. This cannot be undone."
    );

    if (!confirmed) return;

    setErrorMessage("");
    setIsDeleting(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You must be logged in to delete this vault.");
      setIsDeleting(false);
      return;
    }

    const { error: entriesDeleteError } = await supabase
      .from("entries")
      .delete()
      .eq("vault_id", vaultId)
      .eq("user_id", user.id);

    if (entriesDeleteError) {
      setErrorMessage(entriesDeleteError.message);
      setIsDeleting(false);
      return;
    }

    const { error: vaultDeleteError } = await supabase
      .from("vaults")
      .delete()
      .eq("id", vaultId)
      .eq("user_id", user.id);

    if (vaultDeleteError) {
      setErrorMessage(vaultDeleteError.message);
      setIsDeleting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  if (isLoading) {
    return (
      <>
        <AppHeader />

        <main className="vault-page">
          <div className="vault-container-narrow">
            <section className="vault-card">
              <p className="vault-body">Loading vault...</p>
            </section>
          </div>
        </main>
      </>
    );
  }

  const entriesNeeded = Math.max(0, 3 - entryCount);

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
            <div className="vault-badge">Edit Vault</div>

            <h1 className="vault-heading">Update your vault</h1>

            <p className="vault-body">
              Edit the vault details, category, and public visibility settings.
            </p>
          </section>

          <form onSubmit={handleSubmit} className="vault-card">
            {errorMessage && <div className="vault-error">{errorMessage}</div>}

            <Field
              label="Vault name"
              help="Use a clear name so you can find this vault quickly later."
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Research Paper Vault"
                className="vault-input"
              />
            </Field>

            <Field
              label="Description"
              help="Required for public vaults. Explain what this vault contains and who it helps."
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="A collection of sources, notes, links, and ideas for..."
                className="vault-textarea"
              />
            </Field>

            <Field
              label="Category"
              help="Optional. Example: Research paper, Study resources, Writing project."
            >
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Research paper"
                className="vault-input"
              />
            </Field>

            <div className="vault-visibility-box">
              <div>
                <h3>Public vault</h3>

                <p>
                  Public vaults appear in discovery and can be useful to other
                  people. To keep public vaults helpful, they need at least 3
                  saved entries.
                </p>

                <p
                  className={
                    entriesNeeded > 0
                      ? "vault-publish-warning"
                      : "vault-publish-ready"
                  }
                >
                  {entriesNeeded > 0
                    ? `Add ${entriesNeeded} more saved entr${
                        entriesNeeded === 1 ? "y" : "ies"
                      } before publishing.`
                    : "This vault has enough entries to be public."}
                </p>
              </div>

              <label className="vault-toggle-label">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                Make public
              </label>
            </div>

            <div className="vault-actions">
              <Link
                href={`/vaults/${vaultId}`}
                className="vault-button-secondary"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSaving || isDeleting || !name.trim()}
                className="vault-button-primary"
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>

          <section className="vault-danger-zone">
            <div>
              <h2>Delete vault</h2>

              <p>
                This permanently deletes this vault and its saved entries. This
                action cannot be undone.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDeleteVault}
              disabled={isDeleting || isSaving}
              className="vault-button-danger"
            >
              {isDeleting ? "Deleting..." : "Delete vault"}
            </button>
          </section>
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