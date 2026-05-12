"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PublishVaultButtonProps = {
  vaultId: string;
  isPublic: boolean;
  publicStatus?: string | null;
};

export default function PublishVaultButton({
  vaultId,
  isPublic,
  publicStatus,
}: PublishVaultButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handlePublish() {
    setLoading(true);

    const endpoint = isPublic
      ? `/api/vaults/${vaultId}/unpublish`
      : `/api/vaults/${vaultId}/publish`;

    const response = await fetch(endpoint, {
      method: "POST",
    });

    const result = await response.json();

    setLoading(false);

    if (!response.ok) {
      const errorMessage =
        typeof result.error === "string"
          ? result.error
          : "Something went wrong.";

      if (errorMessage.toLowerCase().includes("confirm your email")) {
        alert(
          "Please confirm your email before publishing a vault publicly."
        );
        return;
      }

      if (
        errorMessage.toLowerCase().includes("not unlocked yet") ||
        errorMessage.toLowerCase().includes("build some account history first")
      ) {
        alert(
          "Public sharing is not unlocked yet. Add a few entries, use the app a bit more, and then try again."
        );
        return;
      }

      if (errorMessage.toLowerCase().includes("too many publish attempts")) {
        alert(
          "You’ve tried publishing too many times in a short period. Please wait a bit and try again."
        );
        return;
      }

      alert(errorMessage);
      return;
    }

    if (result.status === "pending") {
      alert(
        "Your vault was submitted for review before becoming public."
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag?.("event", "vault_published", { status: "pending" });
    }

    if (result.status === "public") {
      alert("Your vault is now public.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag?.("event", "vault_published", { status: "public" });
    }

    if (result.status === "private") {
      alert("Your vault is now private.");
    }

    router.refresh();
  }

  const label = isPublic
    ? "Make Private"
    : publicStatus === "pending"
    ? "Pending Review"
    : "Publish Publicly";

  return (
    <button
      type="button"
      className="button button-secondary"
      onClick={handlePublish}
      disabled={loading || publicStatus === "pending"}
    >
      {loading ? "Saving..." : label}
    </button>
  );
}