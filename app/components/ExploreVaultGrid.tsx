"use client";

import Link from "next/link";
import CopyVaultButton from "@/app/components/CopyVaultLinkButton";
import ShareButton from "@/app/components/ShareButton";

export type ExploreVault = {
  id: string;
  title: string;
  description: string;
  badge: string;
  tags: string[];
  entryCount: number;
  updatedAt: string;
};

type ExploreVaultGridProps = {
  vaults: ExploreVault[];
  isLoggedIn: boolean;
};

function formatRelativeDate(dateString: string): string {
  if (!dateString) return "";
  const diffDays = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 86_400_000
  );
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "1 month ago";
  return `${Math.floor(diffDays / 30)} months ago`;
}

function VaultCard({ vault, isLoggedIn }: { vault: ExploreVault; isLoggedIn: boolean }) {
  const relativeDate = formatRelativeDate(vault.updatedAt);
  const resourceLabel = vault.entryCount === 1 ? "resource" : "resources";

  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Stretched link — covers the whole card */}
      <Link
        href={`/vaults/${vault.id}`}
        className="absolute inset-0 z-0 rounded-3xl"
        aria-label={`Open ${vault.title}`}
      />

      {/* Header: title + share pill */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold leading-tight text-slate-950">
          {vault.title}
        </h3>
        <ShareButton
          url={`/vaults/${vault.id}`}
          label="Share"
          className="shrink-0 rounded-full border border-[#d8e8f5] bg-[#ebf2f8] px-3 py-1 text-xs font-semibold text-[#4a7a9b] transition hover:bg-[#d8e8f5]"
        />
      </div>

      {vault.description && (
        <p className="relative z-10 mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {vault.description}
        </p>
      )}

      {vault.tags.length > 0 && (
        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {vault.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Metadata line */}
      <p className="relative z-10 mt-4 text-xs text-slate-400">
        {vault.entryCount} {resourceLabel}
        {relativeDate ? ` · Updated ${relativeDate}` : ""}
      </p>

      {/* CopyVaultButton — only explicit CTA */}
      <div className="relative z-10 mt-auto pt-5">
        <CopyVaultButton vaultId={vault.id} isLoggedIn={isLoggedIn} compact />
      </div>
    </article>
  );
}

export default function ExploreVaultGrid({ vaults, isLoggedIn }: ExploreVaultGridProps) {
  if (!vaults.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h3 className="text-lg font-bold text-slate-950">No vaults found</h3>
        <p className="mt-2 text-sm text-slate-600">Try another search or add more public vaults.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {vaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  );
}
