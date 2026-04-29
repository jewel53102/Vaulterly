import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import AppHeader from "@/app/components/AppHeader";
import FollowButton from "@/app/components/FollowButton";

type TagShape = { name: string }[] | { name: string } | null;

type EntryRow = {
  id: string;
  vault_id: string;
  title: string | null;
  url: string | null;
  description: string | null;
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

export default async function ExplorePage() {
  const supabase = await createClient();

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

  const vaults = ((vaultsData ?? []) as unknown as VaultRow[]).filter(Boolean);

  const authorIds = Array.from(
    new Set(vaults.map((vault) => vault.user_id).filter(Boolean))
  ) as string[];

  let profileMap = new Map<string, ProfileRow>();

  if (authorIds.length > 0) {
    const { data: profilesData, error: profilesError } = await supabase
  .from("profiles")
  .select("id, display_name")
  .in("id", authorIds);

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

  const startHereVault = vaults.find((vault) =>
    getVaultName(vault).toLowerCase().includes("start here")
  );

  const featuredVault = startHereVault ?? vaults[0] ?? null;

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
                Discover curated collections of tools, resources, and systems to help
                you study smarter, stay organized, and get ahead.
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

            <div className="flex gap-2 overflow-x-auto pb-1">
              {categoryFilters.map((category) => (
                <a
                  key={category}
                  href={
                    category === "All"
                      ? "#vaults"
                      : `#${getCategoryAnchor(category)}`
                  }
                  className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {featuredVault && (
            <div className="mb-10 overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6 shadow-sm sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                    ⭐ Featured Student Vault
                  </span>

                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                    {getVaultName(featuredVault)}
                  </h2>

                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                    {featuredVault.description ||
                      "A curated starter vault with the best resources for students."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                      {getVaultCategory(featuredVault)}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                      Public Vault
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                      Student Starter Pack
                    </span>
                  </div>

                  <AuthorFollowRow
                    vault={featuredVault}
                    profileMap={profileMap}
                  />

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/vaults/${featuredVault.id}`}
                      className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                    >
                      View Vault
                    </Link>

                    <Link
                      href={`/vaults/${featuredVault.id}`}
                      className="inline-flex items-center justify-center rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
                    >
                      Copy to My Vaults
                    </Link>
                  </div>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                    <b>*Pro Tip:</b> Copy this vault to your private vaults to keep
                    these guides handy.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Inside this vault
                  </p>

                  <div className="space-y-3">
                    {getVaultPreviewEntries(featuredVault).length > 0 ? (
                      getVaultPreviewEntries(featuredVault).map((entry) => (
                        <div
                          key={entry.id}
                          className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                        >
                          <p className="font-semibold text-blue-500">
                            {entry.title || "Untitled Resource"}
                          </p>

                          {entry.description && (
                            <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                              {entry.description}
                            </p>
                          )}

                          {getEntryTagNames(entry).length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {getEntryTagNames(entry)
                                .slice(0, 3)
                                .map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-600"
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        Open this vault to view the resources inside.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div id="vaults" className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Trending Vaults
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Browse curated student resources, tools, and systems.
              </p>
            </div>
          </div>

          {vaults.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-xl font-semibold text-blue-500">
                No public vaults yet
              </h2>
              <p className="mt-2 text-slate-600">
                Public vaults will appear here once they are created.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {remainingVaults.map((vault, index) => (
                <article
                  key={vault.id}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {getBadge(vault, index)}
                    </span>

                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                      {getVaultCategory(vault)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-7 text-blue-500">
                    {getVaultName(vault)}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-600">
                    {vault.description ||
                      "A curated collection of useful student resources."}
                  </p>

                  <div className="mt-5 flex-1 space-y-2">
                    {getVaultPreviewEntries(vault).length > 0 ? (
                      getVaultPreviewEntries(vault).map((entry) => (
                        <div
                          key={entry.id}
                          className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                        >
                          <p className="line-clamp-1 text-sm font-medium text-slate-900">
                            {entry.title || "Untitled Resource"}
                          </p>

                          {entry.description && (
                            <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                              {entry.description}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-sm text-slate-500">
                        Open this vault to view resources.
                      </p>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      Public
                    </span>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      Student
                    </span>

                    {getVaultPreviewEntries(vault)
                      .flatMap(getEntryTagNames)
                      .slice(0, 2)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <AuthorFollowRow vault={vault} profileMap={profileMap} />

                  <Link
                    href={`/vaults/${vault.id}`}
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View Vault
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
            <p className="text-lg font-semibold text-blue-500">
              Join students organizing useful links, tools, and resources in one place.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Stop losing helpful resources. Save them into vaults you can actually use.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-950 p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Stop losing links. Start building your system.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Create your first vault, save your best resources, and keep everything
              organized in one place.
            </p>

            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-500 transition hover:bg-slate-100"
            >
              Create Your First Vault
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}