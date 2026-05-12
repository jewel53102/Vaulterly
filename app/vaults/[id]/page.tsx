import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";
import { createClient } from "@/utils/supabase/server";
import { duplicatePublicVault } from "@/app/actions";
import ExportVaultButton from "@/app/components/ExportVaultButton";
import VaultEntrySearch from "@/app/components/VaultEntrySearch";
import ShareButton from "@/app/components/ShareButton";
import SharePromptBanner from "@/app/components/SharePromptBanner";

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
  const description =
    vault?.description?.trim() ||
    `Explore ${name} — a free student research vault on Vaulterly. Browse organized sources, notes, and study links.`;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`;

  return {
    title: `${name} — Free Study Vault`,
    description,
    alternates: {
      canonical: `https://myvaulterly.com/vaults/${id}`,
    },
    openGraph: {
      title: `${name} — Free Study Vault | Vaulterly`,
      description,
      url: `https://myvaulterly.com/vaults/${id}`,
      siteName: "Vaulterly",
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${name} — Vaulterly` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Free Study Vault | Vaulterly`,
      description,
      images: [ogImageUrl],
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
      <AppHeaderAuth />

      {vault.is_public && (
        <Suspense>
          <SharePromptBanner vaultId={vault.id} />
        </Suspense>
      )}

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
                    className="inline-flex items-center justify-center rounded-xl bg-[#779EBF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5a87ac]"
                  >
                    Add Entry
                  </Link>
                )}

                {vault.is_public && (
                  <ShareButton url={`/vaults/${vault.id}`} label="Share Vault" />
                )}

                <ExportVaultButton vault={exportData} />
              </div>
            </div>
          </div>
        </section>

        {/* Visitor CTA — prominent conversion banner for non-owners */}
        {vault.is_public && !isOwner && (
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 rounded-2xl border border-[#d8e8f5] bg-[#ebf2f8] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[#2c5f7a]">
                    Save this vault to your account
                  </p>
                  <p className="mt-0.5 text-sm text-[#4a7a9b]">
                    {user
                      ? "Copy it to your vaults and use it as AI context for your own essays."
                      : "Sign up free to save a copy and drop it into ChatGPT or Claude when you write."}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {user ? (
                    <form action={duplicatePublicVault}>
                      <input type="hidden" name="vaultId" value={vault.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-xl bg-[#779EBF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5a87ac]"
                      >
                        Save a copy
                      </button>
                    </form>
                  ) : (
                    <>
                      <Link
                        href={`/signup?next=/vaults/${vault.id}`}
                        className="inline-flex items-center justify-center rounded-xl bg-[#779EBF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5a87ac]"
                      >
                        Sign up free
                      </Link>
                      <Link
                        href={`/login?next=/vaults/${vault.id}`}
                        className="inline-flex items-center justify-center rounded-xl border border-[#b8d4e8] bg-white px-4 py-2.5 text-sm font-semibold text-[#4a7a9b] shadow-sm transition hover:bg-[#ebf2f8]"
                      >
                        Log in
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <VaultEntrySearch
            entries={searchableEntries}
            isOwner={isOwner}
            vaultId={vault.id}
          />
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://myvaulterly.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Browse Research Vaults",
                item: "https://myvaulterly.com/explore",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: getVaultName(vault),
                item: `https://myvaulterly.com/vaults/${vault.id}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}