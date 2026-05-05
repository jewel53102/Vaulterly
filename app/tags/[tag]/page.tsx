'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import UserMenu from '@/app/components/UserMenu'

type PublicVault = {
  id: string
  name: string
  description: string | null
  created_at: string
  user_id: string
}

type Profile = {
  id: string
  username: string | null
}

type VaultWithCreator = PublicVault & {
  username: string | null
}

type VaultTagRow = {
  vault_id: string
  tags:
    | {
        id: string
        name: string
      }
    | {
        id: string
        name: string
      }[]
    | null
}

export default function TagPage() {
  const params = useParams<{ tag: string }>()
  const supabase = useMemo(() => createClient(), [])

  const rawTagName = decodeURIComponent(params.tag || '')
  const tagName = rawTagName.toLowerCase()

  const [matchingVaults, setMatchingVaults] = useState<VaultWithCreator[]>([])
  const [otherVaults, setOtherVaults] = useState<VaultWithCreator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTagVaults() {
      setLoading(true)

      const { data: publicVaultData, error: vaultError } = await supabase
        .from('vaults')
        .select('id, name, description, created_at, user_id')
        .eq('is_public', true)
        .order('created_at', { ascending: false })

      if (vaultError) {
        console.error('Public vault error:', vaultError.message)
        setMatchingVaults([])
        setOtherVaults([])
        setLoading(false)
        return
      }

      const publicVaults = (publicVaultData || []) as PublicVault[]
      const publicVaultIds = publicVaults.map((vault) => vault.id)

      if (publicVaultIds.length === 0) {
        setMatchingVaults([])
        setOtherVaults([])
        setLoading(false)
        return
      }

      const { data: vaultTagData, error: tagError } = await supabase
        .from('vault_tags')
        .select(`
          vault_id,
          tags (
            id,
            name
          )
        `)
        .in('vault_id', publicVaultIds)

      if (tagError) {
        console.error('Tag lookup error:', tagError.message)
        setMatchingVaults([])
        setOtherVaults([])
        setLoading(false)
        return
      }

      const tagRows = (vaultTagData || []) as unknown as VaultTagRow[]
      const matchingVaultIds = new Set<string>()

      tagRows.forEach((row) => {
        if (!row.tags) return

        const tags = Array.isArray(row.tags) ? row.tags : [row.tags]

        const hasMatchingTag = tags.some(
          (tag) => tag.name.toLowerCase() === tagName
        )

        if (hasMatchingTag) {
          matchingVaultIds.add(row.vault_id)
        }
      })

      const userIds = Array.from(new Set(publicVaults.map((vault) => vault.user_id)))

      let profiles: Profile[] = []

      if (userIds.length > 0) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('id, username')
          .in('id', userIds)

        profiles = (profileData || []) as Profile[]
      }

      const profileMap = new Map<string, string | null>()

      profiles.forEach((profile) => {
        profileMap.set(profile.id, profile.username)
      })

      const vaultsWithCreators = publicVaults.map((vault) => ({
        ...vault,
        username: profileMap.get(vault.user_id) || null,
      }))

      setMatchingVaults(
        vaultsWithCreators.filter((vault) => matchingVaultIds.has(vault.id))
      )

      setOtherVaults(
        vaultsWithCreators.filter((vault) => !matchingVaultIds.has(vault.id))
      )

      setLoading(false)
    }

    if (tagName) loadTagVaults()
  }, [supabase, tagName])

  function VaultCard({ vault }: { vault: VaultWithCreator }) {
    return (
      <article className="vault-dashboard-card vault-dashboard-card-public">
        <div className="vault-dashboard-card-top">
          <div className="vault-card-heading-row">
            <h2>
              <Link href={`/vaults/${vault.id}`}>{vault.name}</Link>
            </h2>

            <span className="vault-visibility public">Public</span>
          </div>

          <p>
            {vault.description ||
              'A public collection of saved links, notes, tools, and ideas.'}
          </p>

          {vault.username ? (
            <Link href={`/u/${vault.username}`} className="explore-creator-link">
              @{vault.username}
            </Link>
          ) : null}
        </div>

        <div className="vault-dashboard-card-bottom">
          <Link href={`/vaults/${vault.id}`} className="entry-back-link">
            View vault
          </Link>

          <span>{new Date(vault.created_at).toLocaleDateString()}</span>
        </div>
      </article>
    )
  }

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
                <strong className="brand-text">Vaulterly</strong>
                <p className="app-header-subtitle">Tag discovery</p>
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
          <Link href="/explore" className="entry-back-link">
            ← Back to Explore
          </Link>

          <div className="dashboard-top">
            <div>
              <p className="eyebrow">Tag</p>

              <h1 className="dashboard-title">
                Best {tagName} resources
              </h1>

              <p className="dashboard-subtitle">
                Explore curated collections of {tagName} tools, links, and systems.
              </p>
            </div>
          </div>

          <section className="seo-content-card">
            <p className="eyebrow">Curated Collections</p>

            <h2>Explore public vaults about {tagName}</h2>

            <p>
              This page gathers public Vaulterly collections connected to{' '}
              <strong>#{tagName}</strong>. Use these vaults to discover organized
              resources, useful tools, saved links, notes, references, and ideas
              curated by Vaulterly creators.
            </p>

            <p>
              Browse the most relevant vaults first, then explore other public
              collections that may help you find related resources and inspiration.
            </p>
          </section>

          {loading ? (
            <div className="dashboard-empty">
              <h2>Loading vaults...</h2>
              <p>Finding vaults connected to #{tagName}.</p>
            </div>
          ) : (
            <>
              <section className="tag-results-section">
                <div className="section-heading">
                  <h2>Vaults tagged #{tagName}</h2>
                  <p>Public vaults that use this tag.</p>
                </div>

                {matchingVaults.length === 0 ? (
                  <div className="dashboard-empty">
                    <h2>No matching vaults found</h2>
                    <p>No public vaults are currently tagged with #{tagName}.</p>
                  </div>
                ) : (
                  <div className="vault-dashboard-grid">
                    {matchingVaults.map((vault) => (
                      <VaultCard key={vault.id} vault={vault} />
                    ))}
                  </div>
                )}
              </section>

              <section className="tag-results-section">
                <div className="section-heading">
                  <h2>Other public vaults</h2>
                  <p>More public vaults that are not tagged with #{tagName}.</p>
                </div>

                {otherVaults.length === 0 ? (
                  <div className="dashboard-empty">
                    <h2>No other public vaults yet</h2>
                    <p>Check back as more creators publish vaults.</p>
                  </div>
                ) : (
                  <div className="vault-dashboard-grid">
                    {otherVaults.map((vault) => (
                      <VaultCard key={vault.id} vault={vault} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </section>
    </main>
  )
}