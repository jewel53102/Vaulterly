'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import UserMenu from '@/app/components/UserMenu'
import ShareButton from '@/app/components/ShareButton'
import DuplicateVaultButton from '@/app/components/DuplicateVaultButton'
import VaultTagManager from '@/app/components/VaultTagManager'

type Vault = {
  id: string
  name: string
  description: string | null
  category: string | null
  created_at: string
  is_public: boolean
  user_id: string
}

type Entry = {
  id: string
  title: string
  notes: string | null
  created_at: string
}

type VaultTag = {
  id: string
  name: string
}

type VaultTagRow = {
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

type VaultDetailClientProps = {
  vaultId: string
}

export default function VaultDetailClient({ vaultId }: VaultDetailClientProps) {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [currentUserId, setCurrentUserId] = useState('')
  const [vault, setVault] = useState<Vault | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [vaultTags, setVaultTags] = useState<VaultTag[]>([])
  const [loading, setLoading] = useState(true)

  async function loadVault() {
    if (!vaultId) {
      setLoading(false)
      return
    }

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    setCurrentUserId(user?.id || '')

    const { data: vaultData, error: vaultError } = await supabase
      .from('vaults')
      .select('id, name, description, category, created_at, is_public, user_id')
      .eq('id', vaultId)
      .maybeSingle<Vault>()

    if (vaultError) {
      console.error('Vault load error:', vaultError.message)
      setVault(null)
      setLoading(false)
      return
    }

    if (!vaultData) {
      setVault(null)
      setLoading(false)
      return
    }

    const canView = vaultData.is_public || user?.id === vaultData.user_id

    if (!canView) {
      router.replace('/dashboard')
      return
    }

    setVault(vaultData)

    const { data: entryData, error: entryError } = await supabase
      .from('entries')
      .select('id, title, notes, created_at')
      .eq('vault_id', vaultId)
      .order('created_at', { ascending: false })

    if (entryError) {
      console.error('Entry load error:', entryError.message)
      setEntries([])
    } else {
      setEntries(entryData || [])
    }

    const { data: tagData, error: tagError } = await supabase
      .from('vault_tags')
      .select(`
        tags (
          id,
          name
        )
      `)
      .eq('vault_id', vaultId)

    if (tagError) {
      console.error('Vault tag load error:', tagError.message)
      setVaultTags([])
    } else {
      const tagRows = (tagData || []) as unknown as VaultTagRow[]

      const loadedVaultTags = tagRows.flatMap((row) => {
        if (!row.tags) return []

        if (Array.isArray(row.tags)) {
          return row.tags
        }

        return [row.tags]
      })

      setVaultTags(
        loadedVaultTags.sort((a, b) => a.name.localeCompare(b.name))
      )
    }

    setLoading(false)
  }

  useEffect(() => {
    loadVault()
  }, [vaultId])

  const isOwnVault = currentUserId === vault?.user_id

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
                <p className="app-header-subtitle">
                  {loading ? 'Loading vault' : 'Vault details'}
                </p>
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

      <section className="vault-page">
        <div className="container vault-container">
          {loading ? (
            <p className="dashboard-subtitle">Loading vault...</p>
          ) : !vault ? (
            <div className="dashboard-empty">
              <h2>Vault not found</h2>
              <p>This vault does not exist, is private, or is unavailable.</p>

              <Link href="/dashboard" className="button button-primary">
                Back to Dashboard
              </Link>
            </div>
          ) : (
            <>
              <Link href={isOwnVault ? '/dashboard' : '/explore'} className="entry-back-link">
                ← Back
              </Link>

              <div className="vault-header">
                <div>
                  <p className="eyebrow">
                    {vault.is_public ? 'Public Vault' : 'Private Vault'}
                  </p>

                  <h1>{vault.name}</h1>

                  <p className="vault-description">
                    {vault.description ||
                      'A saved collection of links, notes, tools, and ideas.'}
                  </p>

                  <div className="vault-meta-row">
                    <span
                      className={
                        vault.is_public
                          ? 'vault-visibility public'
                          : 'vault-visibility private'
                      }
                    >
                      {vault.is_public ? 'Public' : 'Private'}
                    </span>

                    <span className="vault-viewing-badge">
                      {entries.length} entr{entries.length === 1 ? 'y' : 'ies'}
                    </span>
                  </div>

                  {vault.category ? (
                    <div className="vault-category-row">
                      <span className="vault-category-pill">{vault.category}</span>
                    </div>
                  ) : null}

                  {vaultTags.length > 0 ? (
                    <div className="vault-tag-list vault-tag-list-public">
                      {vaultTags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/tags/${encodeURIComponent(tag.name)}`}
                          className="tag-pill tag-pill-link"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  ) : null}

                  <div className="share-action-row">
                    {vault.is_public ? (
                      <ShareButton url={`/vaults/${vault.id}`} label="Share Vault" />
                    ) : null}

                    {!isOwnVault ? (
                      <DuplicateVaultButton
                        vaultId={vault.id}
                        vaultName={vault.name}
                        vaultDescription={vault.description}
                      />
                    ) : null}
                  </div>
                </div>

                {isOwnVault ? (
                  <div className="vault-actions">
                    <div className="vault-actions-group">
                      <Link
                        href={`/vaults/${vault.id}/new`}
                        className="button button-primary"
                      >
                        Add Entry
                      </Link>

                      <Link
                        href={`/vaults/${vault.id}/edit`}
                        className="button button-secondary"
                      >
                        Edit Vault
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>

              {vault.is_public ? (
                <section className="seo-content-card">
                  <p className="eyebrow">About this collection</p>

                  <h2>
                    {vault.category
                      ? `${vault.name}: curated ${vault.category} resources`
                      : `${vault.name}: curated resources`}
                  </h2>

                  <p>
                    This public Vaulterly collection brings together saved links,
                    notes, tools, ideas, and resources related to{' '}
                    <strong>{vault.name}</strong>
                    {vault.category ? (
                      <>
                        {' '}
                        in the <strong>{vault.category}</strong> category
                      </>
                    ) : null}
                    . It is designed to help visitors quickly browse useful
                    information without digging through scattered bookmarks,
                    screenshots, notes, or saved posts.
                  </p>

                  {vaultTags.length > 0 ? (
                    <p>
                      Topics in this vault include{' '}
                      {vaultTags.map((tag, index) => (
                        <span key={tag.id}>
                          <Link href={`/tags/${encodeURIComponent(tag.name)}`}>
                            #{tag.name}
                          </Link>
                          {index < vaultTags.length - 1 ? ', ' : '.'}
                        </span>
                      ))}
                    </p>
                  ) : null}

                  <p>
                    Explore the entries below to find curated resources, ideas,
                    and reference material saved by this creator.
                  </p>
                </section>
              ) : null}

              {isOwnVault ? <VaultTagManager vaultId={vault.id} /> : null}

              {entries.length === 0 ? (
                <div className="vault-empty">
                  <h2>No entries yet</h2>
                  <p>This vault does not have any saved entries yet.</p>
                </div>
              ) : (
                <div className="entry-list">
                  {entries.map((entry) => (
                    <article key={entry.id} className="entry-card">
                      <div className="entry-content">
                        <h3>{entry.title}</h3>

                        {entry.notes ? <p className="entry-notes">{entry.notes}</p> : null}
                      </div>

                      <div className="entry-side">
                        <span className="entry-meta">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </span>

                        {isOwnVault ? (
                          <div className="entry-actions">
                            <Link
                              href={`/vaults/${vault.id}/entries/${entry.id}/edit`}
                              className="button button-secondary button-small"
                            >
                              Edit
                            </Link>
                          </div>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}