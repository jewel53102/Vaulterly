import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import AppHeader from "@/app/components/AppHeader";
import FollowButton from "@/app/components/FollowButton";
import FeaturedVaultToggle from "@/app/components/FeaturedVaultToggle";

type TagShape = { name: string }[] | { name: string } | null;

type EntryRow = {
  id: string;
  vault_id: string;
  title: string | null;
  url: string | null;
  description: string | null;
  notes: string | null;
  created_at: string | null;
  entry_tags?: {
    tags?: TagShape;
  }[];
};

type ProfileRow = {
  id: string;
  display_name: string | null;
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

const categoryFilters = [
  "All",
  "Student Resources",
  "Study & Productivity",
  "AI Tools",
  "Side Hustles",
  "Free Learning",
];

function getVaultName(vault: VaultRow | null | undefined): string {
  return vault?.name?.trim() || vault?.title?.trim() || "Untitled Vault";
}

function getBadge(vault: VaultRow, index: number) {
  const name = getVaultName(vault).toLowerCase();

  if (name.includes("start here")) return "⭐ Start Here";
  if (index < 3) return "🔥 Trending";

  return "Popular";
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

function getVaultPreviewEntries(vault: VaultRow) {
  return vault.entries?.slice(0, 3) ?? [];
}

function getVaultCategory(vault: VaultRow) {
  return vault.category || "Student Resources";
}

function getCategoryAnchor(category: string) {
  return category
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("&", "and");
}

function getAuthorName(
  vault: VaultRow,
  profileMap: Map<string, ProfileRow>
): string {
  if (!vault.user_id) return "Vault Creator";

  const profile = profileMap.get(vault.user_id);

  return profile?.display_name?.trim() || "Vault Creator";
}

function vaultMatchesSearch(
  vault: VaultRow,
  searchTerm: string,
  profileMap: Map<string, ProfileRow>
) {
  if (!searchTerm.trim()) return true;

  const query = searchTerm.toLowerCase();

  const authorName = getAuthorName(vault, profileMap);

  const searchableText = [
    vault.category,
    authorName,
    ...(vault.entries?.flatMap((entry) => getEntryTagNames(entry)) ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
}

function AuthorFollowRow({
  vault,
  profileMap,
}: {
  vault: VaultRow;
  profileMap: Map<string, ProfileRow>;
}) {
  if (!vault.user_id) return null;

  return (
    <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
      <Link
        href={`/profiles/${vault.user_id}`}
        className="min-w-0 text-sm font-medium text-slate-600 transition hover:text-slate-950 hover:underline"
      >
        By{" "}
        <span className="font-semibold">
          {getAuthorName(vault, profileMap)}
        </span>
      </Link>

      <FollowButton targetUserId={vault.user_id} />
    </div>
  );
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) {
  const supabase = await createClient();
  const searchTerm = searchParams?.q?.trim() || "";

  const { data: vaultsData, error } = await supabase
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
        vault_id,
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
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Explore page error:", error);
  }

  const allVaults = ((vaultsData ?? []) as unknown as VaultRow[]).filter(
    Boolean
  );

  const allAuthorIds = Array.from(
    new Set(allVaults.map((vault) => vault.user_id).filter(Boolean))
  ) as string[];

  let profileMap = new Map<string, ProfileRow>();

  if (allAuthorIds.length > 0) {
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("id, display_name")
      .in("id", allAuthorIds);

    if (profilesError) {
      console.error("Explore profiles error:", profilesError);
    }

    profileMap = new Map(
      ((profilesData ?? []) as ProfileRow[]).map((profile) => [
        profile.id,
        profile,
      ])
    );
  }

  const vaults = allVaults.filter((vault) =>
    vaultMatchesSearch(vault, searchTerm, profileMap)
  );

  const FEATURED_VAULT_ID = "8275131f-bc9d-4a3d-8a09-9049e8e67bd1";

  const featuredVault =
    vaults.find((vault) => vault.id === FEATURED_VAULT_ID) ?? null;

  const remainingVaults = vaults.filter(
    (vault) => vault.id !== featuredVault?.id
  );

  return (
    <>
      <AppHeader />

      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                Explore Public Vaults
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Explore Vaults Built for Students
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Discover curated collections of tools, resources, and systems to
                help you study smarter, stay organized, and get ahead.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#vaults"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Browse Vaults
                </a>

                {featuredVault && (
                  <Link
                    href={`/vaults/${featuredVault.id}`}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Start with a Free Vault
                  </Link>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((category) => (
                <a
                  key={category}
                  href={
                    category === "All"
                      ? "#vaults"
                      : `#${getCategoryAnchor(category)}`
                  }
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </section>

        {featuredVault && (
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <FeaturedVaultToggle>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                Featured Vault
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                    {getVaultName(featuredVault)}
                  </h2>

                  {featuredVault.description && (
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {featuredVault.description}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/vaults/${featuredVault.id}`}
                      className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                    >
                      Open Vault
                    </Link>

                    <span className="inline-flex items-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                      {getVaultCategory(featuredVault)}
                    </span>
                  </div>

                  <AuthorFollowRow
                    vault={featuredVault}
                    profileMap={profileMap}
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    Inside this vault
                  </h3>

                  <div className="mt-4 space-y-3">
                    {getVaultPreviewEntries(featuredVault).length > 0 ? (
                      getVaultPreviewEntries(featuredVault).map((entry) => (
                        <Link
                          key={entry.id}
                          href={`/entry/${entry.id}/edit`}
                          className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
                        >
                          <p className="text-lg font-semibold text-indigo-600">
                            {entry.title || "Untitled Entry"}
                          </p>

                          {entry.description && (
                            <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                              {entry.description}
                            </p>
                          )}

                          {entry.notes && (
                            <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                              {entry.notes}
                            </p>
                          )}

                          {getEntryTagNames(entry).length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {getEntryTagNames(entry).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        No entries have been added yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </FeaturedVaultToggle>
          </section>
        )}

        <section
          id="vaults"
          className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Browse public vaults
            </h2>

            <p className="mt-2 text-slate-600">
              Search by category, tag, or author, then click any vault to view
              the full collection.
            </p>

            <form action="/explore" className="mt-5 max-w-2xl">
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row">
                <input
                  type="search"
                  name="q"
                  defaultValue={searchTerm}
                  placeholder="Search by category, tag, or author..."
                  className="min-h-[48px] flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />

                <button
                  type="submit"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Search
                </button>

                {searchTerm ? (
                  <Link
                    href="/explore"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Clear
                  </Link>
                ) : null}
              </div>

              {searchTerm ? (
                <p className="mt-3 text-sm text-slate-600">
                  Showing {vaults.length} result
                  {vaults.length === 1 ? "" : "s"} for{" "}
                  <span className="font-semibold text-slate-950">
                    “{searchTerm}”
                  </span>
                </p>
              ) : null}
            </form>
          </div>

          {remainingVaults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {remainingVaults.map((vault, index) => (
                <article
                  key={vault.id}
                  id={getCategoryAnchor(getVaultCategory(vault))}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {getBadge(vault, index)}
                    </span>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {getVaultCategory(vault)}
                    </span>
                  </div>

                  <Link href={`/vaults/${vault.id}`} className="group">
                    <h3 className="text-xl font-bold text-slate-950 group-hover:text-indigo-700">
                      {getVaultName(vault)}
                    </h3>

                    {vault.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {vault.description}
                      </p>
                    )}
                  </Link>

                  <div className="mt-5 space-y-3">
                    {getVaultPreviewEntries(vault).map((entry) => (
                      <div
                        key={entry.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <p className="font-semibold text-indigo-600">
                          {entry.title || "Untitled Entry"}
                        </p>

                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
                    <Link
                      href={`/vaults/${vault.id}`}
                      className="inline-flex text-sm font-semibold text-slate-950 hover:text-indigo-700 hover:underline"
                    >
                      View full vault →
                    </Link>
                  </div>

                  <AuthorFollowRow vault={vault} profileMap={profileMap} />
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <h3 className="text-lg font-semibold text-slate-950">
                {searchTerm ? "No matching vaults found" : "No public vaults yet"}
              </h3>

              <p className="mt-2 text-slate-600">
                {searchTerm
                  ? "Try searching for a different category, tag, or author."
                  : "Public vaults will appear here once they are published."}
              </p>

              {searchTerm ? (
                <Link
                  href="/explore"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Clear search
                </Link>
              ) : null}
            </div>
          )}
        </section>
      </main>
    </>
  );
}