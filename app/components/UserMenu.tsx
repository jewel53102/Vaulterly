'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

type Profile = {
  username: string | null
}

export default function UserMenu() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [loggingOut, setLoggingOut] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      setEmail(user.email || '')

      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .maybeSingle<Profile>()

      setUsername(profile?.username || '')
    }

    loadUser()
  }, [supabase])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current) return

      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  async function handleLogout() {
    setLoggingOut(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      alert(error.message)
      setLoggingOut(false)
      return
    }

    router.push('/login')
    router.refresh()
  }

  const displayName = username || 'Hoard Vault User'

  const initials = username
    ? username.slice(0, 1).toUpperCase()
    : email
      ? email.slice(0, 1).toUpperCase()
      : 'U'

  const publicProfileHref = username ? `/u/${username}` : '/account'

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        type="button"
        className="user-menu-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="user-menu-avatar">{initials}</span>
        <span className="user-menu-trigger-text">Account</span>
      </button>

      {open ? (
        <div className="user-menu-dropdown" role="menu">
          <div className="user-menu-info">
            <p className="user-menu-label">Signed in as</p>
            <p className="user-menu-email">{displayName}</p>
            <p className="user-menu-email">{email || 'Loading...'}</p>
          </div>

          <div className="user-menu-links">
            <Link href="/account" className="user-menu-link" onClick={() => setOpen(false)}>
              My Account
            </Link>

            <Link
              href={publicProfileHref}
              className="user-menu-link"
              onClick={() => setOpen(false)}
            >
              Public Profile
            </Link>

            <Link href="/following" className="user-menu-link" onClick={() => setOpen(false)}>
              Following
            </Link>

            {!username ? (
              <p className="user-menu-help-text">
                Add a username in My Account to activate your public profile.
              </p>
            ) : null}

            <Link href="/dashboard" className="user-menu-link" onClick={() => setOpen(false)}>
              Dashboard
            </Link>

            <Link href="/explore" className="user-menu-link" onClick={() => setOpen(false)}>
              Explore
            </Link>

            <Link href="/welcome" className="user-menu-link" onClick={() => setOpen(false)}>
              New Vault
            </Link>
          </div>

          <button
            type="button"
            className="user-menu-logout"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? 'Logging out...' : 'Log Out'}
          </button>
        </div>
      ) : null}
    </div>
  )
}