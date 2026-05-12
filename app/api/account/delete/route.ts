import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user.id;

  try {
    // 1. Delete entry_tags for all entries belonging to this user
    const { data: userEntries } = await supabase
      .from("entries")
      .select("id")
      .eq("user_id", userId);

    if (userEntries?.length) {
      const entryIds = userEntries.map((e) => e.id);
      await supabase.from("entry_tags").delete().in("entry_id", entryIds);
    }

    // 2. Delete all entries
    await supabase.from("entries").delete().eq("user_id", userId);

    // 3. Delete vault_tags for all vaults belonging to this user
    const { data: userVaults } = await supabase
      .from("vaults")
      .select("id")
      .eq("user_id", userId);

    if (userVaults?.length) {
      const vaultIds = userVaults.map((v) => v.id);
      await supabase.from("vault_tags").delete().in("vault_id", vaultIds);
    }

    // 4. Delete all vaults
    await supabase.from("vaults").delete().eq("user_id", userId);

    // 5. Delete profile
    await supabase.from("profiles").delete().eq("id", userId);

    // 6. Delete auth user — requires service role key
    const admin = createAdminClient();
    const { error: deleteError } = await admin.auth.admin.deleteUser(userId);

    if (deleteError) {
      // Data is already deleted; log the auth cleanup failure but don't fail the request
      console.error("Auth user deletion failed:", deleteError.message);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Account deletion error:", err);
    return NextResponse.json(
      { error: "Account deletion failed. Please contact support." },
      { status: 500 }
    );
  }
}
