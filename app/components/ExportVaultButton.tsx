"use client";

type ExportEntry = {
  title: string | null;
  url: string | null;
  description: string | null;
  notes: string | null;
  created_at: string | null;
  tags: string[];
};

type ExportVault = {
  name: string;
  description: string | null;
  category: string | null;
  is_public: boolean | null;
  created_at: string | null;
  entries: ExportEntry[];
};

function buildMarkdown(vault: ExportVault): string {
  const lines: string[] = [];

  lines.push(`# ${vault.name}`);
  lines.push("");

  if (vault.category) lines.push(`**Category:** ${vault.category}`);
  lines.push(`**Visibility:** ${vault.is_public ? "Public" : "Private"}`);
  if (vault.created_at) lines.push(`**Created:** ${new Date(vault.created_at).toLocaleDateString()}`);
  if (vault.description) {
    lines.push("");
    lines.push(vault.description);
  }

  for (const entry of vault.entries) {
    lines.push("");
    lines.push("---");
    lines.push("");
    lines.push(`## ${entry.title || "Untitled Entry"}`);
    if (entry.url) lines.push(`**URL:** ${entry.url}`);
    if (entry.description) lines.push(`**Description:** ${entry.description}`);
    if (entry.notes) lines.push(`**Notes:** ${entry.notes}`);
    if (entry.tags.length > 0) lines.push(`**Tags:** ${entry.tags.map((t) => `#${t}`).join(" ")}`);
  }

  return lines.join("\n");
}

export default function ExportVaultButton({ vault }: { vault: ExportVault }) {
  function handleExport() {
    const markdown = buildMarkdown(vault);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${vault.name.replace(/\s+/g, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
    >
      Export Vault
    </button>
  );
}
