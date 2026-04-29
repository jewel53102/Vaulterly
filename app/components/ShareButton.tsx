'use client'

import { useState } from 'react'

type ShareButtonProps = {
  url: string
  label?: string
}

export default function ShareButton({ url, label = 'Share' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    const fullUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${url}`
        : url

    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="button button-secondary button-small"
    >
      {copied ? 'Copied!' : label}
    </button>
  )
}