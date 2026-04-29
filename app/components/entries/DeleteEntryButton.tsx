"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type DeleteEntryButtonProps = {
  entryId: string;
  vaultId: string;
};

export default function DeleteEntryButton({
  entryId,
  vaultId,
}: DeleteEntryButtonProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (!confirmed) return;

    setDeleting(true);

    const { error } = await supabase
      .from("entries")
      .delete()
      .eq("id", entryId);

    if (error) {
      alert(error.message);
      setDeleting(false);
      return;
    }

    router.push(`/vault/${vaultId}`);
    router.refresh();
  }

  return (
    <button
      type="button"
      className="button button-danger button-small"
      onClick={handleDelete}
      disabled={deleting}
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}