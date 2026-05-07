"use client";

import { useState } from "react";
import Link from "next/link";

type SearchableEntry = {
  id: string;
  title: string | null;
  url: string | null;
  description: string | null;
  notes: string | null;
  created_at: string | null;
  tags: string[];
};

type Props = {
  entries: SearchableEntry[];
  isOwner: boolean;
  vaultId: string;
};

function matchesSearch(entry: SearchableEntry, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    entry.title?.toLowerCase().includes(q) ||
    entry.description?.toLowerCase().includes(q) ||
    entry.notes?.toLowerCase().includes(q) ||
    entry.tags.some((tag) => tag.toLowerCase().includes(q))
  ) ?? false;
}

export default function VaultEntrySearch({ entries, isOwner, vaultId }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = entries.filter((entry) => matchesSearch(entry, searchTerm.trim()));
  const isSearching = searchTerm.trim().length > 0;

  if (entries.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <h2 className="text-xl font-semibold text-slate-950">No entries yet</h2>
        <p className="mt-2 text-slate-600">
          This vault does not have any saved resources yet.
        </p>
        {isOwner && (
          <Link
            href={`/vaults/${vaultId}/new`}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add Your First Entry
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search entries by title, description, notes, or tag..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#779EBF] focus:ring-4 focus:ring-[#ebf2f8]"
        />
        {isSearching && (
          <p className="mt-2 text-sm text-slate-500">
            {filtered.length === 0
              ? "No entries match your search."
              : `Showing ${filtered.length} of ${entries.length} ${entries.length === 1 ? "entry" : "entries"}`}
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-950">No matches found</h2>
          <p className="mt-2 text-slate-600">
            Try a different title, keyword, or tag.
          </p>
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <article
              key={entry.id}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex-1">
                <h2 className="text-lg font-bold leading-7 text-slate-950">
                  {entry.title || "Untitled Resource"}
                </h2>

                {(entry.description || entry.notes) && (
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {entry.description || entry.notes}
                  </p>
                )}

                {entry.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-2">
                {entry.url && (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Open Resource
                  </a>
                )}

                {isOwner && (
                  <Link
                    href={`/entry/${entry.id}/edit`}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    Edit Entry
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
