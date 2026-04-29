'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

type UserVault = {
  id: string
  name: string
}

type SaveEntryButtonProps = {
  title: string
  url: string | null
  notes: string | null
}

export default function SaveEntryButton({ title, url, notes }: SaveEntryButtonProps) {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [userId, setUserId] = useState('')
  const [vaults, setVaults] = useState<UserVault[]>([])
  const [selectedVaultId, setSelectedVaultId] = useState('')
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadUserVaults() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      setUserId(user.id)

      const { data } = await supabase
        .from('vaults')
        .select('id, name')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      const userVaults = data || []
      setVaults(userVaults)

      if (userVaults.length > 0) {
        setSelectedVaultId(userVaults[0].id)
      }
    }

    loadUserVaults()
  }, [supabase])

  async function saveEntry() {
    if (!userId) {
      router.push('/login')
      return
    }

    if (!selectedVaultId) {
      setMessage('Create a vault first before saving this entry.')
      return
    }

    setSaving(true)
    setMessage('')

    const { error } = await supabase.from('entries').insert({
      vault_id: selectedVaultId,
      title,
      url,
      notes,
    })

    setSaving(false)

    if (error) {
      setMessage(error.message || 'Could not save entry.')
      return
    }

    setMessage('Saved to your vault.')
    setOpen(false)
  }

  return (
    <div className="save-entry-wrap">
      <button
        type="button"
        className="button button-secondary button-small"
        onClick={() => setOpen((prev) => !prev)}
      >
        Save to My Vault
      </button>

      {open ? (
        <div className="save-entry-popover">
          {vaults.length === 0 ? (
            <>
              <p className="save-entry-message">Create a vault first before saving entries.</p>
              <button
                type="button"
                className="button button-primary button-small"
                onClick={() => router.push('/welcome')}
              >
                Create Vault
              </button>
            </>
          ) : (
            <>
              <label className="save-entry-label">Choose vault</label>

              <select
                value={selectedVaultId}
                onChange={(e) => setSelectedVaultId(e.target.value)}
                className="save-entry-select"
              >
                {vaults.map((vault) => (
                  <option key={vault.id} value={vault.id}>
                    {vault.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="button button-primary button-small"
                onClick={saveEntry}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Entry'}
              </button>
            </>
          )}

          {message ? <p className="save-entry-message">{message}</p> : null}
        </div>
      ) : null}
    </div>
  )
} 