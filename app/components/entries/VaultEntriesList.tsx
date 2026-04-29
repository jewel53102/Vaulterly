"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DeleteEntryButton from "./DeleteEntryButton";

type EntryTag = {
  tag_id: string;
  tags: {
    id: string;
    name: string;
  }[];
};

type Entry = {
  id: string;
  title: string;
  source_url: string | null;
  notes: string | null;
  created_at: string;
  entry_tags?: EntryTag[];
};

type VaultEntriesListProps = {
  entries: Entry[];
  vaultId: string;
  canManage?: boolean;
};

export default function VaultEntriesList({
  entries,
  vaultId,
  canManage = true,
}: VaultEntriesListProps) {
  const [search, setSearch] = useState("");

  const filteredEntries = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return entries;

    return entries.filter((entry) => {
      const titleMatch = entry.title?.toLowerCase().includes(query);
      const notesMatch = entry.notes?.toLowerCase().includes(query);
      const tagMatch = entry.entry_tags?.some((entryTag) =>
        entryTag.tags?.[0]?.name?.toLowerCase().includes(query)
      );

      return Boolean(titleMatch || notesMatch || tagMatch);
    });
  }, [entries, search]);

  function handleTagClick(tagName: string) {
    setSearch((current) =>
      current.trim().toLowerCase() === tagName.toLowerCase() ? "" : tagName
    );
  }

  return (
    <>
      <div className="vault-search-wrap">
        <input
          type="text"
          className="vault-search-input"
          placeholder="Search links, notes, or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredEntries.length === 0 ? (
        <div className="vault-empty">
          <h2>No matches found</h2>
          <p>Try searching a keyword, tag, or link.</p>

          {canManage ? (
            <Link href={`/vault/${vaultId}/new`} className="button button-primary">
              Add Link
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="entry-list">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="entry-card">
              <div className="entry-content">
                <h3>{entry.title}</h3>

                {entry.source_url ? (
                  <a
                    href={entry.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="entry-link"
                  >
                    {entry.source_url}
                  </a>
                ) : null}

                {entry.notes ? (
                  <p className="entry-notes">{entry.notes}</p>
                ) : null}

                {entry.entry_tags && entry.entry_tags.length > 0 ? (
                  <div className="entry-tag-list">
                    {entry.entry_tags.map((entryTag) => {
                      const tagName = entryTag.tags?.[0]?.name;

                      if (!tagName) return null;

                      const isActive =
                        search.trim().toLowerCase() === tagName.toLowerCase();

                      return (
                        <button
                          key={entryTag.tag_id}
                          type="button"
                          className={`entry-tag-button ${
                            isActive ? "entry-tag-button-active" : ""
                          }`}
                          onClick={() => handleTagClick(tagName)}
                          title="Click to filter your links"
                        >
                          {tagName}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <div className="entry-side">
                <div className="entry-meta">
                  <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                </div>

                {canManage ? (
                  <div className="entry-actions">
                    <Link
                      href={`/entry/${entry.id}/edit`}
                      className="button button-secondary button-small"
                    >
                      Edit
                    </Link>

                    <DeleteEntryButton entryId={entry.id} vaultId={vaultId} />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}