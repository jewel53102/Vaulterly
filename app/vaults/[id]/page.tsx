import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AppHeader from "@/app/components/AppHeader";
import { createClient } from "@/utils/supabase/server";
import { duplicatePublicVault } from "@/app/actions";
import ExportVaultButton from "@/app/components/ExportVaultButton";
import VaultEntrySearch from "@/app/components/VaultEntrySearch";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: vault } = await supabase
    .from("vaults")
    .select("name, title, description")
    .eq("id", id)
    .maybeSingle();

  const name = vault?.name?.trim() || vault?.title?.trim() || "Untitled Vault";
  const description = vault?.description?.trim() || "Explore this curated vault on Vaulterly.";

  return {
    title: name,
    description,
    openGraph: {
      title: `${name} — Vaulterly`,
      description,
      url: `https://myvaulterly.com/vaults/${id}`,
      siteName: "Vaulterly",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Vaulterly`,
      description,
    },
  };
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
      created_at,
      entry_tags (
        tags (
          name
        )
      )
    )
  `
  )
  .eq("id", id)
  .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const vault = data as unknown as VaultRow;

  const isOwner = user?.id === vault.user_id;
  const canView = vault.is_public === true || isOwner;

  if (!canView) {
    notFound();
  }

  const entries = vault.entries ?? [];

  const searchableEntries = entries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    url: entry.url,
    description: entry.description,
    notes: entry.notes,
    created_at: entry.created_at,
    tags: getEntryTagNames(entry),
  }));

  const exportData = {
    name: getVaultName(vault),
    description: vault.description,
    category: vault.category,
    is_public: vault.is_public,
    created_at: vault.created_at,
    entries: entries.map((entry) => ({
      title: entry.title,
      url: entry.url,
      description: entry.description,
      notes: entry.notes,
      created_at: entry.created_at,
      tags: getEntryTagNames(entry),
    })),
  };

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
                    <span className="rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
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
                    className="inline-flex items-center justify-center rounded-xl bg-[#779EBF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ebf2f8]0"
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

                <ExportVaultButton vault={exportData} />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <VaultEntrySearch
            entries={searchableEntries}
            isOwner={isOwner}
            vaultId={vault.id}
          />
        </section>
      </main>
    </>
  );
}