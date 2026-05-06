'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { useUsernameCheck } from '@/app/hooks/useUsernameCheck'

type Profile = {
  username: string | null
  bio: string | null
  website: string | null
  avatar_url: string | null
}

export default function AccountPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [userId, setUserId] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [toast, setToast] = useState('')

  const usernameStatus = useUsernameCheck(username, userId || undefined)

  useEffect(() => {
    async function loadAccount() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUserId(user.id)
      setCurrentEmail(user.email || '')
      setEmail(user.email || '')

      const { data: profile } = await supabase
        .from('profiles')
        .select('username, bio, website, avatar_url')
        .eq('id', user.id)
        .maybeSingle<Profile>()

      setUsername(profile?.username || '')
      setBio(profile?.bio || '')
      setWebsite(profile?.website || '')
      setAvatarUrl(profile?.avatar_url || '')
      setLoading(false)
    }

    loadAccount()
  }, [router, supabase])

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(''), 3500)
  }

  function normalizeWebsite(value: string) {
    const trimmed = value.trim()

    if (!trimmed) return ''

    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed
    }

    return `https://${trimmed}`
  }

  async function updateProfile() {
    const cleanedUsername = username.trim()
    const cleanedWebsite = normalizeWebsite(website)

    if (!cleanedUsername) {
      showToast('Username cannot be empty.')
      return
    }

    setSaving(true)

    const { error } = await supabase
      .from('profiles')
      .upsert(
        {
          id: userId,
          username: cleanedUsername,
          bio: bio.trim(),
          website: cleanedWebsite,
          avatar_url: avatarUrl,
        },
        { onConflict: 'id' }
      )

    setSaving(false)

    if (error) {
      showToast('Could not update profile. Username may already be taken.')
      return
    }

    setUsername(cleanedUsername)
    setWebsite(cleanedWebsite)
    showToast('Profile updated.')
  }

  async function uploadAvatar(file: File) {
    if (!userId) return

    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file.')
      return
    }

    setUploadingAvatar(true)

    const fileExt = file.name.split('.').pop() || 'jpg'
    const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (uploadError) {
      setUploadingAvatar(false)
      showToast(uploadError.message || 'Could not upload avatar.')
      return
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    const publicUrl = data.publicUrl

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(
        {
          id: userId,
          username: username.trim(),
          bio: bio.trim(),
          website: normalizeWebsite(website),
          avatar_url: publicUrl,
        },
        { onConflict: 'id' }
      )

    setUploadingAvatar(false)

    if (profileError) {
      showToast(profileError.message || 'Avatar uploaded, but profile could not update.')
      return
    }

    setAvatarUrl(publicUrl)
    showToast('Avatar updated.')
  }

  async function updateEmail() {
    const cleanedEmail = email.trim()

    if (!cleanedEmail) {
      showToast('Email cannot be empty.')
      return
    }

    if (cleanedEmail === currentEmail) {
      showToast('That is already your current email.')
      return
    }

    setSaving(true)

    const { error } = await supabase.auth.updateUser({
      email: cleanedEmail,
    })

    setSaving(false)

    if (error) {
      showToast(error.message || 'Could not update email.')
      return
    }

    showToast('Check your email to confirm the change.')
  }

  async function updatePassword() {
    if (password.length < 8) {
      showToast('Password must be at least 8 characters.')
      return
    }

    setSaving(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setSaving(false)

    if (error) {
      showToast(error.message || 'Could not update password.')
      return
    }

    setPassword('')
    showToast('Password updated.')
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  if (loading) {
    return (
      <main className="account-page">
        <div className="account-container">
          <p className="account-help-text">Loading account...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="account-page">
      {toast ? <div className="account-toast">{toast}</div> : null}

      <div className="account-container">
        <Link href="/dashboard" className="account-back-link">
          ← Back to Dashboard
        </Link>

        <div className="account-header">
          <h1>My Account</h1>
          <p>Manage your profile, login details, and account security.</p>
        </div>

        <section className="account-card">
          <h2>Public Profile</h2>
          <p>Update the details shown on your public Vaulterly profile.</p>

          <div className="account-form-section">
            <div className="account-avatar-row">
              <div className="account-avatar-preview">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile avatar" />
                ) : (
                  <span>{username ? username.slice(0, 1).toUpperCase() : 'H'}</span>
                )}
              </div>

              <div>
                <label htmlFor="avatar" className="button button-secondary button-small">
                  {uploadingAvatar ? 'Uploading...' : 'Upload Avatar'}
                </label>

                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  hidden
                  disabled={uploadingAvatar}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) uploadAvatar(file)
                  }}
                />

                <p className="account-help-text">
                  Upload a square image for your public profile.
                </p>
              </div>
            </div>

            <div className="account-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
              />

              {usernameStatus === 'checking' && (
                <p className="account-help-text">Checking availability...</p>
              )}
              {usernameStatus === 'available' && (
                <p className="account-help-text" style={{ color: '#16a34a' }}>✓ Username is available</p>
              )}
              {usernameStatus === 'taken' && (
                <p className="account-help-text" style={{ color: '#dc2626' }}>✗ Username is already taken</p>
              )}
              {usernameStatus === 'idle' && (
                <p className="account-help-text">
                  Your public profile will be available at /u/{username || 'username'}.
                </p>
              )}
            </div>

            <div className="account-field">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="What do you collect, save, or curate?"
                rows={4}
              />

              <p className="account-help-text">
                This appears on your public profile.
              </p>
            </div>

            <div className="account-field">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
              />

              <p className="account-help-text">
                Add your website, newsletter, portfolio, shop, or social profile.
              </p>
            </div>

            <button
              type="button"
              onClick={updateProfile}
              disabled={saving || usernameStatus === 'taken'}
              className="button button-primary button-small"
            >
              {saving ? 'Saving...' : 'Save Public Profile'}
            </button>
          </div>
        </section>

        <section className="account-card">
          <h2>Email</h2>
          <p>Update the email address connected to your login.</p>

          <div className="account-form-section">
            <div className="account-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />

              <button
                type="button"
                onClick={updateEmail}
                disabled={saving}
                className="button button-primary button-small"
              >
                {saving ? 'Saving...' : 'Update Email'}
              </button>

              <p className="account-help-text">
                Email changes may require confirmation before they take effect.
              </p>
            </div>
          </div>
        </section>

        <section className="account-card">
          <h2>Security</h2>
          <p>Change your password to keep your account protected.</p>

          <div className="account-form-section">
            <div className="account-field">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a new password"
              />

              <button
                type="button"
                onClick={updatePassword}
                disabled={saving}
                className="button button-primary button-small"
              >
                {saving ? 'Saving...' : 'Change Password'}
              </button>
            </div>
          </div>
        </section>

        <section className="account-card account-danger-card">
          <h2>Account Access</h2>
          <p>Sign out of your Vaulterly account.</p>

          <button
            type="button"
            onClick={signOut}
            className="button button-danger button-small"
          >
            Sign Out
          </button>
        </section>
      </div>
    </main>
  )
}