import Link from "next/link";
import { notFound } from "next/navigation";
import AppHeader from "@/app/components/AppHeader";
import { createClient } from "@/utils/supabase/server";
import { duplicatePublicVault } from "@/app/actions";

type TagShape = { name: string }[] | { name: string } | null;

type EntryRow = {
  id: string
  title: string | null
  url: string | null
  description: string | null
  notes: string | null
  created_at: string | null
  entry_tags?: {
    tags?: TagShape
  }[]
};

type VaultRow = {
  id: string;
  user_id: string | null;
  name: string | null;
  title: string | null;
  description: string | null;
  category: string | null;
  is_public: boolean | null;
  created_at: string | null;
  entries?: EntryRow[];
};

function getVaultName(vault: VaultRow | null | undefined): string {
  return vault?.name?.trim() || vault?.title?.trim() || "Untitled Vault";
}

function getEntryTagNames(entry: EntryRow): string[] {
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

export default async function VaultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
  .from("vaults")
  .select(
    `
    id,
    user_id,
    name,
    title,
    description,
    category,
    is_public,
    created_at,
    entries (
      id,
      title,
      url,
      description,
      notes,
      created_at
    )
  `
  )
  .eq("id", id)
  .maybeSingle();

console.log("VAULT PAGE ID:", id);
console.log("VAULT PAGE DATA:", data);
console.log("VAULT PAGE ERROR:", error);

if (error || !data) {
  notFound();
}

  const vault = data as unknown as VaultRow;

  const isOwner = user?.id === vault.user_id;
  const canView = vault.is_public === true || isOwner;

  if (!canView) {
    if (error) {
  console.error("Vault page error:", error);
  notFound();
}

if (!data) {
  notFound();
};
  }

  const entries = vault.entries ?? [];

  return (
    <>
      <AppHeader />

      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
              <Link
                href={vault.is_public ? "/explore" : "/dashboard"}
                className="text-sm font-medium text-slate-600 hover:text-slate-950"
              >
                ← Back to {vault.is_public ? "Explore" : "Dashboard"}
              </Link>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 flex flex-wrap gap-2">
                  {vault.is_public && (
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                      Public Vault
                    </span>
                  )}

                  {!vault.is_public && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      Private Vault
                    </span>
                  )}

                  {vault.category && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {vault.category}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-950">
                  {getVaultName(vault)}
                </h1>

                {vault.description && (
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                    {vault.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                {isOwner && (
                  <Link
                    href={`/vaults/${vault.id}/edit`}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Edit Vault
                  </Link>
                )}

                {isOwner && (
                  <Link
                    href={`/vaults/${vault.id}/new`}
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                  >
                    Add Entry
                  </Link>
                )}

                {vault.is_public && !isOwner && (
                  <form action={duplicatePublicVault}>
                    <input type="hidden" name="vaultId" value={vault.id} />

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                    >
                      Duplicate to My Vaults
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {entries.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-xl font-semibold text-slate-950">
                No entries yet
              </h2>

              <p className="mt-2 text-slate-600">
                This vault does not have any saved resources yet.
              </p>

              {isOwner && (
                <Link
                  href={`/vaults/${vault.id}/new`}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Add Your First Entry
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => {
                const tags = getEntryTagNames(entry);

                return (
                  <article
                    key={entry.id}
                    className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex-1">
                      <h2 className="text-lg font-bold leading-7 text-slate-950">
                        {entry.title || "Untitled Resource"}
                      </h2>

                      {(entry.description || entry.notes) && (
  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
    {entry.description || entry.notes}
  </p>
)}

                      {tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex flex-col gap-2">
                      {entry.url && (
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          Open Resource
                        </a>
                      )}

                      {isOwner && (
                        <Link
                          href={`/entry/${entry.id}/edit`}
                          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                        >
                          Edit Entry
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}