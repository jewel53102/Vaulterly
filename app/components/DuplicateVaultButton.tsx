'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

type DuplicateVaultButtonProps = {
  vaultId: string
  vaultName: string
  vaultDescription: string | null
}

export default function DuplicateVaultButton({
  vaultId,
  vaultName,
  vaultDescription,
}: DuplicateVaultButtonProps) {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [duplicating, setDuplicating] = useState(false)

  async function duplicateVault() {
    setDuplicating(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const { data: newVault, error: vaultError } = await supabase
      .from('vaults')
      .insert({
        user_id: user.id,
        name: `${vaultName} Copy`,
        description: vaultDescription,
        is_public: false,
      })
      .select('id')
      .single()

    if (vaultError || !newVault) {
      alert(vaultError?.message || 'Could not duplicate vault.')
      setDuplicating(false)
      return
    }

    const { data: entries } = await supabase
      .from('entries')
      .select('title, url, notes')
      .eq('vault_id', vaultId)

    if (entries && entries.length > 0) {
      await supabase.from('entries').insert(
        entries.map((entry) => ({
          vault_id: newVault.id,
          title: entry.title,
          url: entry.url,
          notes: entry.notes,
        }))
      )
    }

    router.push(`/vaults/${newVault.id}`)
  }

  return (
    <button
      type="button"
      onClick={duplicateVault}
      disabled={duplicating}
      className="button button-secondary button-small"
    >
      {duplicating ? 'Duplicating...' : 'Duplicate Vault'}
    </button>
  )
}