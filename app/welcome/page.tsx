'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

type Tag = {
  id: string
  name: string
}

export default function WelcomePage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [userId, setUserId] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUserId(user.id)
    }

    loadUser()
  }, [router, supabase])

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function parseTags(value: string) {
    return Array.from(
      new Set(
        value
          .split(',')
          .map((tag) => tag.trim().toLowerCase())
          .filter(Boolean)
      )
    )
  }

  async function createOrFindTag(tagName: string): Promise<Tag | null> {
    if (!userId) return null

    const cleanedTag = tagName.trim().toLowerCase()

    const { data, error } = await supabase
      .from('tags')
      .upsert(
        {
          user_id: userId,
          name: cleanedTag,
        },
        {
          onConflict: 'user_id,name',
          ignoreDuplicates: true,
        }
      )
      .select('id, name')
      .single<Tag>()

    if (!error && data) return data

    const { data: fallbackTag, error: fallbackError } = await supabase
      .from('tags')
      .select('id, name')
      .eq('user_id', userId)
      .eq('name', cleanedTag)
      .maybeSingle<Tag>()

    if (fallbackError) {
      console.error('Tag fallback error:', fallbackError.message)
      return null
    }

    return fallbackTag
  }

  async function handleCreateVault(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const cleanedName = name.trim()
    const cleanedCategory = category.trim()

    if (!cleanedName) {
      setMessage('Please add a vault name.')
      return
    }

    if (!userId) {
      router.push('/login')
      return
    }

    setSaving(true)
    setMessage('')

    const baseSlug = createSlug(cleanedName)
    const slug = `${baseSlug}-${Date.now().toString(36)}`

    const { data: newVault, error: vaultError } = await supabase
      .from('vaults')
      .insert({
        user_id: userId,
        name: cleanedName,
        description: description.trim() || null,
        category: cleanedCategory || null,
        slug,
        is_public: isPublic,
      })
      .select('id')
      .single()

    if (vaultError || !newVault) {
      setSaving(false)
      setMessage(vaultError?.message || 'Could not create vault.')
      return
    }

    const tagNames = parseTags(tagInput)

    if (tagNames.length > 0) {
      const createdTags = await Promise.all(
        tagNames.map((tagName) => createOrFindTag(tagName))
      )

      const validTags = createdTags.filter(Boolean) as Tag[]

      if (validTags.length > 0) {
        const { error: linkError } = await supabase
          .from('vault_tags')
          .upsert(
            validTags.map((tag) => ({
              vault_id: newVault.id,
              tag_id: tag.id,
            })),
            {
              onConflict: 'vault_id,tag_id',
              ignoreDuplicates: true,
            }
          )

        if (linkError) {
          console.error('Vault tag link error:', linkError.message)
        }
      }
    }

    setSaving(false)
    router.push(`/vaults/${newVault.id}`)
  }

  return (
    <main className="auth-page">
      <div className="auth-shell auth-shell-single">
        <section className="auth-panel auth-panel-form auth-panel-form-full">
          <div className="auth-card">
            <div className="auth-card-header">
              <p className="eyebrow">New Vault</p>
              <h2>Create your vault</h2>
              <p>
                Start a collection for links, notes, tools, ideas, research, or anything worth saving.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleCreateVault}>
              <div className="form-group">
                <label htmlFor="name">Vault Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Example: AI Tools, Marketing Ideas, Recipes"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Example: Business, Recipes, AI Tools, Research"
                />

                <p className="account-help-text">
                  Categories help organize your dashboard.
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What will this vault be used for?"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Vault Tags</label>
                <input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="ai, business, marketing, recipes"
                />

                <p className="account-help-text">
                  Separate tags with commas. Tags help people find your public vaults and help you filter your dashboard.
                </p>
              </div>

              <div className="toggle-row">
                <div>
                  <p className="toggle-label">Make this vault public</p>
                  <p className="toggle-help">
                    Public vaults can appear on Explore and your public profile.
                  </p>
                </div>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                  <span className="switch-slider" />
                </label>
              </div>

              {message ? (
                <p className="form-message form-message-error">{message}</p>
              ) : null}

              <button
                type="submit"
                disabled={saving}
                className="button button-primary auth-submit"
              >
                {saving ? 'Creating...' : 'Create Vault'}
              </button>

              <Link href="/dashboard" className="button button-secondary auth-submit">
                Cancel
              </Link>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}