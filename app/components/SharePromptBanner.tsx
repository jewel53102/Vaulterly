"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function SharePromptBanner({ vaultId }: { vaultId: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (!searchParams.get("published") || dismissed) return null;

  function dismiss() {
    setDismissed(true);
    router.replace(pathname, { scroll: false });
  }

  async function copyLink() {
    const url = `${window.location.origin}/vaults/${vaultId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="border-b border-[#d8e8f5] bg-[#ebf2f8]">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-[#2c5f7a]">
              Your vault is now public — share it with your study group
            </p>
            <p className="mt-0.5 text-sm text-[#4a7a9b]">
              Send this link to classmates. Anyone with it can view your vault and save a copy.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center justify-center rounded-xl bg-[#779EBF] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5a87ac]"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="text-sm font-medium text-[#4a7a9b] hover:text-[#2c5f7a]"
              aria-label="Dismiss"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
