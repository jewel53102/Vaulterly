'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type Tag = {
  id: string
  name: string
}

type VaultTagRow = {
  tag_id: string
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

type VaultTagManagerProps = {
  vaultId: string
}

export default function VaultTagManager({ vaultId }: VaultTagManagerProps) {
  const supabase = useMemo(() => createClient(), [])

  const [userId, setUserId] = useState('')
  const [tags, setTags] = useState<Tag[]>([])
  const [newTag, setNewTag] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadTags() {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      setUserId(user.id)

      const { data, error } = await supabase
        .from('vault_tags')
        .select(`
          tag_id,
          tags (
            id,
            name
          )
        `)
        .eq('vault_id', vaultId)

      if (error) {
        setTags([])
        setLoading(false)
        return
      }

      const rows = (data || []) as unknown as VaultTagRow[]

      const loadedTags = rows.flatMap((row) => {
        if (!row.tags) return []

        if (Array.isArray(row.tags)) {
          return row.tags
        }

        return [row.tags]
      })

      setTags(loadedTags.sort((a, b) => a.name.localeCompare(b.name)))
      setLoading(false)
    }

    loadTags()
  }, [supabase, vaultId])

  async function findOrCreateTag(tagName: string): Promise<Tag | null> {
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
    setMessage(fallbackError.message || 'Could not find tag.')
    return null
  }

  return fallbackTag
}

  async function addTag() {
    const cleanedTag = newTag.trim().toLowerCase()

    if (!cleanedTag) return
    if (!userId) return

    if (tags.some((tag) => tag.name.toLowerCase() === cleanedTag)) {
      setMessage('That tag is already on this vault.')
      return
    }

    setSaving(true)
    setMessage('')

    const tagToUse = await findOrCreateTag(cleanedTag)

    if (!tagToUse) {
      setSaving(false)
      return
    }

    const { error: linkError } = await supabase
      .from('vault_tags')
      .upsert(
        {
          vault_id: vaultId,
          tag_id: tagToUse.id,
        },
        {
          onConflict: 'vault_id,tag_id',
          ignoreDuplicates: true,
        }
      )

    setSaving(false)

    if (linkError) {
      setMessage(linkError.message || 'Could not add tag to vault.')
      return
    }

    setTags((prev) => {
      const alreadyExists = prev.some((tag) => tag.id === tagToUse.id)

      if (alreadyExists) return prev

      return [...prev, tagToUse].sort((a, b) => a.name.localeCompare(b.name))
    })

    setNewTag('')
    setMessage('Tag added.')
  }

  async function removeTag(tagId: string) {
    const { error } = await supabase
      .from('vault_tags')
      .delete()
      .eq('vault_id', vaultId)
      .eq('tag_id', tagId)

    if (error) {
      setMessage(error.message || 'Could not remove tag.')
      return
    }

    setTags((prev) => prev.filter((tag) => tag.id !== tagId))
    setMessage('Tag removed.')
  }

  if (loading) {
    return (
      <div className="vault-tag-manager">
        <p className="account-help-text">Loading tags...</p>
      </div>
    )
  }

  return (
    <div className="vault-tag-manager">
      <div>
        <h3>Vault Tags</h3>
        <p>Add topics so this vault can appear on public profiles and discovery pages.</p>
      </div>

      <div className="vault-tag-input-row">
        <input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }}
          placeholder="Add a tag, like ai, marketing, recipes..."
        />

        <button
          type="button"
          onClick={addTag}
          disabled={saving}
          className="button button-primary button-small"
        >
          {saving ? 'Adding...' : 'Add Tag'}
        </button>
      </div>

      {tags.length > 0 ? (
        <div className="vault-tag-list">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              className="tag-pill tag-pill-removable"
              onClick={() => removeTag(tag.id)}
              title="Remove tag"
            >
              #{tag.name} ×
            </button>
          ))}
        </div>
      ) : (
        <p className="account-help-text">No tags added yet.</p>
      )}

      {message ? <p className="account-help-text">{message}</p> : null}
    </div>
  )
}