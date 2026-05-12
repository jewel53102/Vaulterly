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
  entries: {
    id: string;
    title: string;
    url: string | null;
    description: string | null;
  }[];
};

type ExploreVaultGridProps = {
  vaults: ExploreVault[];
  isLoggedIn: boolean;
};

function VaultCard({ vault, isLoggedIn }: { vault: ExploreVault; isLoggedIn: boolean }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-xl font-bold leading-tight text-slate-950">
        <Link href={`/vaults/${vault.id}`} className="hover:underline">
          {vault.title}
        </Link>
      </h3>

      {vault.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{vault.description}</p>
      )}

      {vault.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {vault.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {vault.entries.length > 0 && (
        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Inside this vault</p>
          <ul className="space-y-2">
            {vault.entries.slice(0, 3).map((entry) => (
              <li key={entry.id} className="line-clamp-1 text-sm font-medium text-slate-800">
                • {entry.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-5 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/vaults/${vault.id}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            View Vault
          </Link>
          <ShareButton
            url={`/vaults/${vault.id}`}
            label="Share"
            className="inline-flex items-center justify-center rounded-xl border border-[#d8e8f5] bg-[#ebf2f8] px-4 py-2.5 text-sm font-semibold text-[#4a7a9b] transition hover:bg-[#d8e8f5]"
          />
        </div>
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
