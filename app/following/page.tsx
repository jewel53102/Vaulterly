'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import UserMenu from '@/app/components/UserMenu'

type FollowedProfile = {
  id: string
  username: string | null
  bio: string | null
  publicVaultCount: number
}

export default function FollowingPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [profiles, setProfiles] = useState<FollowedProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFollowing() {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data: followData, error: followError } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id)

      if (followError) {
        console.error('Follow error:', followError.message)
        setProfiles([])
        setLoading(false)
        return
      }

      const followingIds = (followData || []).map((follow) => follow.following_id)

      if (followingIds.length === 0) {
        setProfiles([])
        setLoading(false)
        return
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, username, bio')
        .in('id', followingIds)

      if (profileError) {
        console.error('Profile error:', profileError.message)
        setProfiles([])
        setLoading(false)
        return
      }

      const { data: vaultData } = await supabase
        .from('vaults')
        .select('id, user_id')
        .in('user_id', followingIds)
        .eq('is_public', true)

      const vaultCountMap = new Map<string, number>()

      ;(vaultData || []).forEach((vault) => {
        vaultCountMap.set(vault.user_id, (vaultCountMap.get(vault.user_id) || 0) + 1)
      })

      const followedProfiles = (profileData || []).map((profile) => ({
        id: profile.id,
        username: profile.username,
        bio: profile.bio,
        publicVaultCount: vaultCountMap.get(profile.id) || 0,
      }))

      setProfiles(followedProfiles)
      setLoading(false)
    }

    loadFollowing()
  }, [router, supabase])

  return (
    <main className="dashboard-page">
      <header className="app-header">
        <div className="container app-header-inner">
          <div className="app-header-left">
            <Link href="/dashboard" className="app-header-brand">
              <span className="brand-mark brand-mark-small">
                <span className="brand-safe">
                  <span className="brand-brain">HV</span>
                </span>
              </span>

              <div>
                <strong className="brand-text">Hoard Vault</strong>
                <p className="app-header-subtitle">People you follow</p>
              </div>
            </Link>
          </div>

          <div className="app-header-actions">
            <Link href="/dashboard" className="button button-ghost">
              Dashboard
            </Link>

            <Link href="/explore" className="button button-secondary">
              Explore
            </Link>

            <Link href="/welcome" className="button button-primary">
              New Vault
            </Link>

            <UserMenu />
          </div>
        </div>
      </header>

      <section className="dashboard-section">
        <div className="container">
          <div className="dashboard-top">
            <div>
              <p className="eyebrow">Following</p>
              <h1 className="dashboard-title">People You Follow</h1>
              <p className="dashboard-subtitle">
                View the creators you follow and jump into their public vaults.
              </p>
            </div>

            <Link href="/explore" className="button button-primary">
              Find More Creators
            </Link>
          </div>

          {loading ? (
            <div className="dashboard-empty">
              <h2>Loading following...</h2>
              <p>Finding the creators you follow.</p>
            </div>
          ) : profiles.length === 0 ? (
            <div className="dashboard-empty">
              <h2>You are not following anyone yet</h2>
              <p>Follow creators from Explore to build your personal discovery feed.</p>
              <Link href="/explore" className="button button-primary">
                Browse Public Vaults
              </Link>
            </div>
          ) : (
            <div className="following-grid">
              {profiles.map((profile) => {
                const username = profile.username || 'unknown-user'

                return (
                  <article key={profile.id} className="following-card">
                    <div className="following-card-avatar">
                      {profile.username ? profile.username.slice(0, 1).toUpperCase() : '?'}
                    </div>

                    <div className="following-card-content">
                      <h2>@{profile.username || 'Unnamed Creator'}</h2>

                      <p>
                        {profile.bio ||
                          'This creator is sharing public vaults, links, notes, and resources.'}
                      </p>

                      <span className="vault-viewing-badge">
                        {profile.publicVaultCount} public vault
                        {profile.publicVaultCount === 1 ? '' : 's'}
                      </span>

                      <div className="share-action-row">
                        {profile.username ? (
                          <Link
                            href={`/u/${username}`}
                            className="button button-primary button-small"
                          >
                            View Public Vaults
                          </Link>
                        ) : (
                          <span className="button button-secondary button-small">
                            Username missing
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}