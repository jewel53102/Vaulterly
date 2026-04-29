"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CopyVaultButton from "@/app/components/CopyVaultLinkButton";

export type ExploreVault = {
  id: string;
  title: string;
  description: string;
  category: string;
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

const CATEGORY_ORDER = [
  "All",
  "College Survival",
  "Study & Productivity",
  "AI Tools",
  "Side Hustles",
  "Free Learning",
  "Student Resources",
];

function getCategoryEmoji(category: string) {
  const normalized = category.toLowerCase();
  if (normalized.includes("college")) return "🎓";
  if (normalized.includes("study") || normalized.includes("productivity")) return "🧠";
  if (normalized.includes("ai") || normalized.includes("tool")) return "💻";
  if (normalized.includes("side") || normalized.includes("money")) return "💸";
  if (normalized.includes("free") || normalized.includes("learning")) return "📚";
  return "🗂️";
}

function VaultCard({ vault, isLoggedIn }: { vault: ExploreVault; isLoggedIn: boolean }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {vault.badge}
        </span>
        <span className="text-xs font-medium text-slate-500">{getCategoryEmoji(vault.category)} {vault.category}</span>
      </div>

      <h3 className="text-xl font-bold leading-tight text-slate-950">
        <Link href={`/vaults/${vault.id}`} className="hover:underline">
          {vault.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{vault.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {vault.tags.length ? (
          vault.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
              #{tag}
            </span>
          ))
        ) : (
          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
            #student
          </span>
        )}
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</p>
        {vault.entries.length ? (
          <ul className="space-y-2">
            {vault.entries.slice(0, 3).map((entry) => (
              <li key={entry.id} className="line-clamp-1 text-sm font-medium text-slate-800">
                • {entry.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">Resources coming soon.</p>
        )}
      </div>

      <div className="mt-auto grid gap-3 pt-5 sm:grid-cols-2">
        <Link
          href={`/vaults/${vault.id}`}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          View Vault
        </Link>
        <CopyVaultButton vaultId={vault.id} isLoggedIn={isLoggedIn} compact />
      </div>
    </article>
  );
}

export default function ExploreVaultGrid({ vaults, isLoggedIn }: ExploreVaultGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const categorySet = new Set(vaults.map((vault) => vault.category));
    const sortedKnown = CATEGORY_ORDER.filter((category) => category === "All" || categorySet.has(category));
    const customCategories = Array.from(categorySet).filter((category) => !CATEGORY_ORDER.includes(category));
    return [...sortedKnown, ...customCategories];
  }, [vaults]);

  const filteredVaults = useMemo(() => {
    if (activeCategory === "All") return vaults;
    return vaults.filter((vault) => vault.category === activeCategory);
  }, [activeCategory, vaults]);

  const groupedVaults = useMemo(() => {
    return filteredVaults.reduce<Record<string, ExploreVault[]>>((acc, vault) => {
      acc[vault.category] = acc[vault.category] ?? [];
      acc[vault.category].push(vault);
      return acc;
    }, {});
  }, [filteredVaults]);

  return (
    <div>
      <div className="sticky top-0 z-20 -mx-4 border-b border-slate-200 bg-slate-50/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {category === "All" ? "All" : `${getCategoryEmoji(category)} ${category}`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Browse collections</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
            {activeCategory === "All" ? "Trending student vaults" : activeCategory}
          </h2>
        </div>
        <p className="hidden text-sm font-medium text-slate-500 sm:block">
          {filteredVaults.length} vault{filteredVaults.length === 1 ? "" : "s"}
        </p>
      </div>

      {filteredVaults.length ? (
        activeCategory === "All" ? (
          <div className="mt-6 space-y-10">
            {Object.entries(groupedVaults).map(([category, categoryVaults]) => (
              <section key={category}>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-slate-950">
                    {getCategoryEmoji(category)} {category}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-950"
                  >
                    View all
                  </button>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {categoryVaults.slice(0, 6).map((vault) => (
                    <VaultCard key={vault.id} vault={vault} isLoggedIn={isLoggedIn} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredVaults.map((vault) => (
              <VaultCard key={vault.id} vault={vault} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        )
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="text-lg font-bold text-slate-950">No vaults found</h3>
          <p className="mt-2 text-sm text-slate-600">Try another category or add more public vaults.</p>
        </div>
      )}

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-lg font-bold text-slate-950">Join students organizing 1,000+ resources in one place.</p>
        <p className="mt-2 text-sm text-slate-600">Save the best links, copy useful vaults, and build your personal study system.</p>
      </div>
    </div>
  );
}
