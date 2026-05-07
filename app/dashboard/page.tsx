'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import AppHeader from '@/app/components/AppHeader'

type Vault = {
  id: string
  name: string
  title: string | null
  description: string | null
  category: string | null
  created_at: string
  is_public: boolean
  user_id: string
  tags: string[]
}

type VaultBase = {
  id: string
  name: string
  title: string | null
  description: string | null
  category: string | null
  created_at: string
  is_public: boolean
  user_id: string
}

type FollowedVault = {
  id: string
  name: string
  title: string | null
  description: string | null
  created_at: string
  user_id: string
  username: string | null
}

type DashboardTag = {
  id: string
  name: string
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

type Profile = {
  id: string
  username: string | null
}

type OnboardingProgress = {
  hasVault: boolean
  hasThreeEntries: boolean
  hasPublicVault: boolean
  followsTwoCreators: boolean
  hasFollowedVaults: boolean
}

function getVaultName(vault: {
  name?: string | null
  title?: string | null
}): string {
  return vault.name?.trim() || vault.title?.trim() || 'Untitled Vault'
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [vaults, setVaults] = useState<Vault[]>([])
  const [dashboardTags, setDashboardTags] = useState<DashboardTag[]>([])
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filterSearch, setFilterSearch] = useState('')
  const [visibilityFilter, setVisibilityFilter] = useState<
    'all' | 'public' | 'private'
  >('all')

  const [followedVaults, setFollowedVaults] = useState<FollowedVault[]>([])
  const [loading, setLoading] = useState(true)
  const [followedVaultsLoading, setFollowedVaultsLoading] = useState(true)

  const [progress, setProgress] = useState<OnboardingProgress>({
    hasVault: false,
    hasThreeEntries: false,
    hasPublicVault: false,
    followsTwoCreators: false,
    hasFollowedVaults: false,
  })

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data: vaultData, error: vaultError } = await supabase
        .from('vaults')
        .select(
          'id, name, title, description, category, created_at, is_public, user_id'
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      const userVaultsBase = vaultError ? [] : ((vaultData || []) as VaultBase[])
      const userVaultIds = userVaultsBase.map((vault) => vault.id)

      let userVaultsWithTags: Vault[] = userVaultsBase.map((vault) => ({
        ...vault,
        tags: [],
      }))

      const tagMap = new Map<string, DashboardTag>()
      const vaultTagMap = new Map<string, Set<string>>()

      if (userVaultIds.length > 0) {
        const { data: vaultTagData } = await supabase
          .from('vault_tags')
          .select(`
            vault_id,
            tags (
              id,
              name
            )
          `)
          .in('vault_id', userVaultIds)

        const vaultTagRows = (vaultTagData || []) as unknown as VaultTagRow[]

        vaultTagRows.forEach((row) => {
          if (!row.tags) return

          const tags = Array.isArray(row.tags) ? row.tags : [row.tags]

          if (!vaultTagMap.has(row.vault_id)) {
            vaultTagMap.set(row.vault_id, new Set())
          }

          tags.forEach((tag) => {
            if (!tag.id || !tag.name) return

            tagMap.set(tag.id, {
              id: tag.id,
              name: tag.name,
            })

            vaultTagMap.get(row.vault_id)?.add(tag.name)
          })
        })

        userVaultsWithTags = userVaultsBase.map((vault) => ({
          ...vault,
          tags: Array.from(vaultTagMap.get(vault.id) || []).sort((a, b) =>
            a.localeCompare(b)
          ),
        }))
      }

      setVaults(userVaultsWithTags)
      setDashboardTags(
        Array.from(tagMap.values()).sort((a, b) => a.name.localeCompare(b.name))
      )

      let entryCount = 0

      if (userVaultIds.length > 0) {
        const { count } = await supabase
          .from('entries')
          .select('*', { count: 'exact', head: true })
          .in('vault_id', userVaultIds)

        entryCount = count || 0
      }

      const { data: followData } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id)

      const followingIds = (followData || []).map((follow) => follow.following_id)

      const followedVaultList = await loadFollowedVaults(user.id, followingIds)

      setProgress({
        hasVault: userVaultsWithTags.length > 0,
        hasThreeEntries: entryCount >= 3,
        hasPublicVault: userVaultsWithTags.some((vault) => vault.is_public),
        followsTwoCreators: followingIds.length >= 2,
        hasFollowedVaults: followedVaultList.length > 0,
      })

      setLoading(false)
    }

    loadDashboard()
  }, [router, supabase])

  async function loadFollowedVaults(userId: string, followingIds?: string[]) {
    setFollowedVaultsLoading(true)

    let followedIds = followingIds || []

    if (!followingIds) {
      const { data: followData, error: followError } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', userId)

      if (followError) {
        setFollowedVaults([])
        setFollowedVaultsLoading(false)
        return []
      }

      followedIds = (followData || []).map((follow) => follow.following_id)
    }

    if (followedIds.length === 0) {
      setFollowedVaults([])
      setFollowedVaultsLoading(false)
      return []
    }

    const { data: followedVaultData, error: followedVaultError } = await supabase
      .from('vaults')
      .select('id, name, title, description, created_at, user_id')
      .in('user_id', followedIds)
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (followedVaultError) {
      setFollowedVaults([])
      setFollowedVaultsLoading(false)
      return []
    }

    const vaultOwnerIds = Array.from(
      new Set((followedVaultData || []).map((vault) => vault.user_id))
    )

    let profileMap = new Map<string, string | null>()

    if (vaultOwnerIds.length > 0) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', vaultOwnerIds)

      profileMap = new Map(
        ((profileData || []) as Profile[]).map((profile) => [
          profile.id,
          profile.username,
        ])
      )
    }

    const formattedVaults: FollowedVault[] = (followedVaultData || []).map(
      (vault) => ({
        id: vault.id,
        name: vault.name,
        title: vault.title,
        description: vault.description,
        created_at: vault.created_at,
        user_id: vault.user_id,
        username: profileMap.get(vault.user_id) || null,
      })
    )

    setFollowedVaults(formattedVaults)
    setFollowedVaultsLoading(false)

    return formattedVaults
  }

  const categories = useMemo(() => {
    return Array.from(
      new Set(vaults.map((vault) => vault.category).filter(Boolean) as string[])
    ).sort((a, b) => a.localeCompare(b))
  }, [vaults])

  const filteredVaults = useMemo(() => {
    const searchTerm = filterSearch.trim().toLowerCase()

    return vaults.filter((vault) => {
      const vaultName = getVaultName(vault).toLowerCase()
      const description = vault.description?.toLowerCase() || ''
      const category = vault.category?.toLowerCase() || ''
      const tags = vault.tags.map((tag) => tag.toLowerCase())

      const matchesSearch =
        !searchTerm ||
        vaultName.includes(searchTerm) ||
        description.includes(searchTerm) ||
        category.includes(searchTerm) ||
        tags.some((tag) => tag.includes(searchTerm))

      const matchesCategory =
        !selectedCategory || vault.category === selectedCategory

      const matchesTag = !selectedTag || vault.tags.includes(selectedTag)

      const matchesVisibility =
        visibilityFilter === 'all' ||
        (visibilityFilter === 'public' && vault.is_public) ||
        (visibilityFilter === 'private' && !vault.is_public)

      return matchesSearch && matchesCategory && matchesTag && matchesVisibility
    })
  }, [vaults, filterSearch, selectedCategory, selectedTag, visibilityFilter])

  const completedSetupCount = Object.values(progress).filter(Boolean).length

  const showOnboarding =
    !progress.hasVault ||
    !progress.hasThreeEntries ||
    !progress.hasPublicVault ||
    !progress.followsTwoCreators ||
    !progress.hasFollowedVaults

  const hasActiveFilters =
    filterSearch.trim() !== '' ||
    selectedCategory !== '' ||
    selectedTag !== '' ||
    visibilityFilter !== 'all'

  function clearFilters() {
    setSelectedTag('')
    setSelectedCategory('')
    setFilterSearch('')
    setVisibilityFilter('all')
  }

  return (
    <>
      <AppHeader />

      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                  Dashboard
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  Your Vaults
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                  Manage your private and public collections of links, notes,
                  tools, and ideas.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/welcome"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    Create New Vault
                  </Link>

                  <Link
                    href="/explore"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Explore Public Vaults
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:min-w-[360px]">
                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-slate-950">
                    {vaults.length}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Total Vaults
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-[#4a7a9b]">
                    {vaults.filter((vault) => vault.is_public).length}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Public
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-emerald-600">
                    {dashboardTags.length}
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    Tags
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setVisibilityFilter('all')}
                className={
                  visibilityFilter === 'all'
                    ? 'whitespace-nowrap rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition'
                    : 'whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100'
                }
              >
                All Vaults
              </button>

              <button
                type="button"
                onClick={() => setVisibilityFilter('public')}
                className={
                  visibilityFilter === 'public'
                    ? 'whitespace-nowrap rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition'
                    : 'whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100'
                }
              >
                Public
              </button>

              <button
                type="button"
                onClick={() => setVisibilityFilter('private')}
                className={
                  visibilityFilter === 'private'
                    ? 'whitespace-nowrap rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white shadow-sm transition'
                    : 'whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100'
                }
              >
                Private
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? '' : category
                    )
                  }
                  className={
                    selectedCategory === category
                      ? 'whitespace-nowrap rounded-full bg-[#779EBF] px-4 py-2 text-sm font-medium text-white shadow-sm transition'
                      : 'whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100'
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {showOnboarding && (
            <div className="mb-8 overflow-hidden rounded-3xl border border-[#d8e8f5] bg-gradient-to-br from-[#ebf2f8] via-white to-[#f0f7fc] p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-[#d8e8f5] px-3 py-1 text-sm font-semibold text-[#4a7a9b]">
                    First Session Wins
                  </span>

                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                    Finish setting up your vault system
                  </h2>

                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                    You’ve completed {completedSetupCount} of 5 setup steps.
                    Keep going so your dashboard becomes more useful.
                  </p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#4a7a9b] shadow-sm">
                  {Math.round((completedSetupCount / 5) * 100)}% Complete
                </span>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[#779EBF] transition-all"
                  style={{ width: `${(completedSetupCount / 5) * 100}%` }}
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ['Create your first vault', progress.hasVault],
                  ['Add at least 3 entries', progress.hasThreeEntries],
                  ['Make one vault public', progress.hasPublicVault],
                  ['Follow 2 creators', progress.followsTwoCreators],
                  ['Discover a public vault', progress.hasFollowedVaults],
                ].map(([label, complete]) => (
                  <div
                    key={label as string}
                    className={
                      complete
                        ? 'rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700'
                        : 'rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600'
                    }
                  >
                    <span className="mr-2">{complete ? '✓' : '○'}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  Find a Vault
                </p>

                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Search and filter your vaults
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Search by name, description, category, visibility, or tag.
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Search
                </span>
                <input
                  type="search"
                  value={filterSearch}
                  onChange={(event) => setFilterSearch(event.target.value)}
                  placeholder="Search vaults..."
                  className="min-h-[52px] rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#779EBF] focus:ring-4 focus:ring-[#ebf2f8]"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Category
                </span>
                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="min-h-[52px] rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#779EBF] focus:ring-4 focus:ring-[#ebf2f8]"
                >
                  <option value="">All categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Tag
                </span>
                <select
                  value={selectedTag}
                  onChange={(event) => setSelectedTag(event.target.value)}
                  className="min-h-[52px] rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#779EBF] focus:ring-4 focus:ring-[#ebf2f8]"
                >
                  <option value="">All tags</option>
                  {dashboardTags.map((tag) => (
                    <option key={tag.id} value={tag.name}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {dashboardTags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTag('')}
                  className={
                    selectedTag === ''
                      ? 'rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white'
                      : 'rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200'
                  }
                >
                  All Tags
                </button>

                {dashboardTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() =>
                      setSelectedTag(selectedTag === tag.name ? '' : tag.name)
                    }
                    className={
                      selectedTag === tag.name
                        ? 'rounded-full bg-[#779EBF] px-3 py-1.5 text-xs font-semibold text-white'
                        : 'rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200'
                    }
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div id="vaults" className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                My Vaults
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Open, edit, and organize your saved collections.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-xl font-semibold text-blue-500">
                Loading your vaults...
              </h2>
              <p className="mt-2 text-slate-600">
                Getting your saved collections ready.
              </p>
            </div>
          ) : vaults.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-xl font-semibold text-blue-500">
                No vaults yet
              </h2>
              <p className="mt-2 text-slate-600">
                Create your first vault to start saving useful links, notes,
                tools, and ideas.
              </p>

              <Link
                href="/welcome"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Create Your First Vault
              </Link>
            </div>
          ) : filteredVaults.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-xl font-semibold text-blue-500">
                No vaults found
              </h2>
              <p className="mt-2 text-slate-600">
                Try another category, tag, visibility filter, or search term.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredVaults.map((vault) => (
                <article
                  key={vault.id}
                  className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span
                      className={
                        vault.is_public
                          ? 'rounded-full bg-[#ebf2f8] px-3 py-1 text-xs font-medium text-[#4a7a9b]'
                          : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'
                      }
                    >
                      {vault.is_public ? 'Public' : 'Private'}
                    </span>

                    {vault.category && (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {vault.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold leading-7 text-blue-500">
                    {getVaultName(vault)}
                  </h3>

                  <p className="mt-2 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-600">
                    {vault.description ||
                      'A saved collection of links, tools, notes, and resources.'}
                  </p>

                  {vault.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {vault.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto flex flex-wrap gap-3 pt-5">
                    <Link
                      href={`/vaults/${vault.id}`}
                      className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Open Vault
                    </Link>

                    <Link
                      href={`/vaults/${vault.id}/edit`}
                      className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                  </div>

                  <p className="mt-4 text-xs font-medium text-slate-500">
                    Created {formatDate(vault.created_at)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                  Following
                </p>

                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Vaults from people you follow
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Recent public vaults shared by creators you follow.
                </p>
              </div>

              <Link
                href="/explore"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Explore More
              </Link>
            </div>

            {followedVaultsLoading ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-xl font-semibold text-blue-500">
                  Loading followed vaults...
                </h2>
                <p className="mt-2 text-slate-600">
                  Finding public vaults from people you follow.
                </p>
              </div>
            ) : followedVaults.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-xl font-semibold text-blue-500">
                  No followed vaults yet
                </h2>
                <p className="mt-2 text-slate-600">
                  Follow creators from Explore to see their public vaults here.
                </p>

                <Link
                  href="/explore"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Browse Public Vaults
                </Link>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {followedVaults.map((vault) => (
                  <article
                    key={vault.id}
                    className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-[#ebf2f8] px-3 py-1 text-xs font-medium text-[#4a7a9b]">
                        Public
                      </span>

                      {vault.username && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          @{vault.username}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold leading-7 text-blue-500">
                      {getVaultName(vault)}
                    </h3>

                    <p className="mt-2 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-600">
                      {vault.description ||
                        'A public vault from a creator you follow.'}
                    </p>

                    <Link
                      href={`/vaults/${vault.id}`}
                      className="mt-auto inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Open Vault
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-950 p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Keep building your vault system.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Add new vaults, organize resources by tag, and make your best
              collections public when you’re ready to share them.
            </p>

            <Link
              href="/welcome"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-500 transition hover:bg-slate-100"
            >
              Create New Vault
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}