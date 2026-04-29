import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import FollowButton from "@/app/components/FollowButton";
import AppHeader from "@/app/components/AppHeader";

type ProfilePageProps = {
  params: Promise<{
    userId: string;
  }>;
};

type VaultRow = {
  id: string;
  user_id: string;
  name: string | null;
  title: string | null;
  description: string | null;
  category: string | null;
  is_public: boolean | null;
  created_at: string | null;
};

type ProfileRow = {
  id: string;
  display_name?: string | null;
  username?: string | null;
  full_name?: string | null;
  name?: string | null;
  bio?: string | null;
  website?: string | null;
  avatar_url?: string | null;
  created_at?: string | null;
};

function getVaultName(vault: VaultRow) {
  return vault.name?.trim() || vault.title?.trim() || "Untitled Vault";
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;

  const supabase = await createClient();

  if (!userId) {
    return <div>Missing user profile.</div>;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    console.error("Profile page profile error:", profileError);
  }

  const { data: vaults, error: vaultsError } = await supabase
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
      created_at
    `
    )
    .eq("user_id", userId)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (vaultsError) {
    console.error("Profile page vaults error:", vaultsError);
  }

  const typedProfile = profile as ProfileRow | null;
  const publicVaults = (vaults ?? []) as VaultRow[];

  const displayName =
    typedProfile?.display_name?.trim?.() ||
    typedProfile?.username?.trim?.() ||
    typedProfile?.full_name?.trim?.() ||
    typedProfile?.name?.trim?.() ||
    "Vault Creator";

  return (
    <>
      <AppHeader />

      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <Link
              href="/explore"
              className="text-sm font-medium text-slate-600 hover:text-slate-950 hover:underline"
            >
              ← Back to Explore
            </Link>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
                    {typedProfile?.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={typedProfile.avatar_url}
                        alt={displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      displayName.charAt(0).toUpperCase()
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Creator Profile
                    </p>

                    <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                      {displayName}
                    </h1>

                    {typedProfile?.username && (
                      <p className="mt-1 text-sm text-slate-500">
                        @{typedProfile.username}
                      </p>
                    )}

                    {typedProfile?.bio && (
                      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                        {typedProfile.bio}
                      </p>
                    )}

                    {typedProfile?.website && (
                      <a
                        href={typedProfile.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex text-sm font-medium text-indigo-700 hover:underline"
                      >
                        Visit website
                      </a>
                    )}
                  </div>
                </div>

                <FollowButton targetUserId={userId} />
              </div>

              <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Public Vaults</p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">
                    {publicVaults.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Profile</p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">
                    Public
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Creator</p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Public Vaults by {displayName}
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Browse the public collections this creator has shared.
            </p>
          </div>

          {publicVaults.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="text-xl font-semibold text-slate-950">
                No public vaults yet
              </h3>
              <p className="mt-2 text-slate-600">
                This creator has not shared any public vaults.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {publicVaults.map((vault) => (
                <Link
                  key={vault.id}
                  href={`/vaults/${vault.id}`}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      Public Vault
                    </span>

                    {vault.category && (
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                        {vault.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold leading-7 text-blue-500">
                    {getVaultName(vault)}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {vault.description || "View this public vault."}
                  </p>

                  <span className="mt-5 inline-flex text-sm font-semibold text-slate-950">
                    View Vault →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}