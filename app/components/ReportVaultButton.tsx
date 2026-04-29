"use client";

import { useState } from "react";

type ReportVaultButtonProps = {
  vaultId: string;
};

export default function ReportVaultButton({
  vaultId,
}: ReportVaultButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleReport() {
    const reason = window.prompt(
      "Report this vault. Enter a reason (spam, abuse, misleading, unsafe):"
    );

    if (!reason) return;

    setLoading(true);

    const response = await fetch("/api/report-vault", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vaultId, reason }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      alert(result.error || "Unable to submit report.");
      return;
    }

    alert("Report submitted.");
  }

  return (
    <button
      type="button"
      className="button button-secondary button-small"
      onClick={handleReport}
      disabled={loading}
    >
      {loading ? "Reporting..." : "Report"}
    </button>
  );
}