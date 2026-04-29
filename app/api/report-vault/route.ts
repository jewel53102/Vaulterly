import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const body = await request.json();
  const vaultId = body?.vaultId as string | undefined;
  const reason = body?.reason as string | undefined;
  const details = body?.details as string | undefined;

  if (!vaultId || !reason) {
    return NextResponse.json(
      { error: "vaultId and reason are required." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("vault_reports").insert({
    vault_id: vaultId,
    reporter_user_id: user?.id ?? null,
    reason,
    details: details ?? null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}