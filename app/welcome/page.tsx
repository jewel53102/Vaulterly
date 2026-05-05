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
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold text-slate-950">
            Vaulterly
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-600">
            New Vault
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Create your vault
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Start a collection for links, notes, tools, ideas, research, or
            anything worth saving.
          </p>

          <form className="mt-6 space-y-5" onSubmit={handleCreateVault}>
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Vault Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Example: AI Tools, Marketing Ideas, Recipes"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Category
              </label>
              <input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Example: Business, Recipes, AI Tools, Research"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Categories help organize your dashboard.
              </p>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will this vault be used for?"
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Vault Tags
              </label>
              <input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="ai, business, marketing, recipes"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Separate tags with commas. Tags help people find your public
                vaults and help you filter your dashboard.
              </p>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Make this vault public
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Public vaults can appear on Explore and your public profile.
                </p>
              </div>
              <label className="relative mt-0.5 inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-300 transition after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-5" />
              </label>
            </div>

            {message && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Creating...' : 'Create Vault'}
            </button>

            <Link
              href="/dashboard"
              className="block w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </main>
  )
}
