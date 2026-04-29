import { notFound } from "next/navigation";
import Link from "next/link";
import AppHeader from "@/app/components/AppHeader";
import FollowButton from "@/app/components/FollowButton";
import { createClient } from "@/utils/supabase/server";

type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  const supabase = await createClient();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", decodedUsername)
    .maybeSingle();

  if (profileError || !profile) {
    notFound();
  }

  const { data: vaults, error: vaultsError } = await supabase
    .from("vaults")
    .select(
      `
      *,
      entries (
        id
      )
    `
    )
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .not("description", "is", null)
    .neq("description", "")
    .order("created_at", { ascending: false });

  if (vaultsError) {
    console.error(vaultsError);
  }

  const qualifiedVaults =
    vaults?.filter((vault) => {
      const entryCount = vault.entries?.length || 0;
      return entryCount >= 3;
    }) || [];

  return (
    <>
      <AppHeader />

      <main className="vault-page">
        <div className="vault-container">
          <section className="vault-card">
            <div className="vault-topbar-between">
              <div>
                <div className="vault-badge">Profile</div>

                <h1 className="vault-heading">@{profile.username}</h1>

                {profile.bio ? (
                  <p className="vault-body">{profile.bio}</p>
                ) : (
                  <p className="vault-body">
                    Public vaults created by this user.
                  </p>
                )}

                {profile.website && (
                  <div className="vault-actions-left">
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noreferrer"
                      className="vault-button-secondary"
                    >
                      Visit website
                    </a>
                  </div>
                )}
              </div>

              <FollowButton targetUserId={profile.id} />
            </div>
          </section>

          {qualifiedVaults.length === 0 ? (
            <section className="vault-empty-state">
              <h2>No public vaults yet</h2>
              <p>This user hasn’t published any qualifying vaults yet.</p>
            </section>
          ) : (
            <section className="vault-card-grid">
              {qualifiedVaults.map((vault) => {
                const entryCount = vault.entries?.length || 0;
                const title = vault.name || vault.title || "Untitled Vault";

                return (
                  <Link
                    key={vault.id}
                    href={`/vaults/${vault.id}`}
                    className="vault-public-card"
                  >
                    <div className="vault-pill-row">
                      <span className="vault-badge-small">Public</span>

                      {vault.category && (
                        <span className="vault-pill">{vault.category}</span>
                      )}
                    </div>

                    <h2>{title}</h2>

                    {vault.description && <p>{vault.description}</p>}

                    <div className="vault-card-footer">
                      {entryCount} saved resource
                      {entryCount === 1 ? "" : "s"}
                    </div>
                  </Link>
                );
              })}
            </section>
          )}
        </div>
      </main>
    </>
  );
}