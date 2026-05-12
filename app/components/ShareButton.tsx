'use client'

import { useState } from 'react'

type ShareButtonProps = {
  url: string
  label?: string
  className?: string
}

export default function ShareButton({
  url,
  label = 'Share',
  className = 'button button-secondary button-small',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    const fullUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${url}`
        : url

    await navigator.clipboard.writeText(fullUrl)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag?.('event', 'vault_shared', { url })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className={className}
    >
      {copied ? 'Copied!' : label}
    </button>
  )
}