"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type DeleteVaultButtonProps = {
  vaultId: string;
  vaultName: string;
};

export default function DeleteVaultButton({
  vaultId,
  vaultName,
}: DeleteVaultButtonProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${vaultName}"? This will permanently remove the vault and all entries inside it.`
    );

    if (!confirmed) return;

    setDeleting(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("You must be logged in to delete this vault.");
      setDeleting(false);
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("vaults")
      .delete()
      .eq("id", vaultId)
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      setDeleting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <button
      type="button"
      className="button button-danger"
      onClick={handleDelete}
      disabled={deleting}
    >
      {deleting ? "Deleting Vault..." : "Delete Vault"}
    </button>
  );
}