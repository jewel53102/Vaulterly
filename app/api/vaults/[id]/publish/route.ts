import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { consumeRateLimit } from "@/app/lib/security/rateLimit";
import { scoreVaultForSpam } from "@/applib/security/antiSpam";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const { id: vaultId } = await context.params;
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verified email gate
  if (!user.email_confirmed_at) {
    return NextResponse.json(
      { error: "Please confirm your email before publishing publicly." },
      { status: 403 }
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, created_at, is_trusted, public_posting_unlocked, spam_flags")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  }

  const accountAgeMs =
    Date.now() - new Date(profile.created_at).getTime();
  const accountAgeDays = accountAgeMs / (1000 * 60 * 60 * 24);

  // Basic trust gates
  const { count: totalEntries } = await supabase
    .from("entries")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (
    !profile.is_trusted &&
    !profile.public_posting_unlocked &&
    (accountAgeDays < 3 || (totalEntries ?? 0) < 5 || profile.spam_flags > 0)
  ) {
    return NextResponse.json(
      {
        error:
          "Public publishing is not unlocked yet. Build some account history first.",
      },
      { status: 403 }
    );
  }

  // Rate limit publishing attempts
  const publishLimit = await consumeRateLimit({
    supabase,
    userId: user.id,
    action: "publish_vault",
    limit: 3,
    windowMinutes: 60,
  });

  if (!publishLimit.allowed) {
    return NextResponse.json(
      { error: "Too many publish attempts. Please try again later." },
      { status: 429 }
    );
  }

  const { data: vault, error: vaultError } = await supabase
    .from("vaults")
    .select("id, user_id, name, description")
    .eq("id", vaultId)
    .eq("user_id", user.id)
    .single();

  if (vaultError || !vault) {
    return NextResponse.json({ error: "Vault not found." }, { status: 404 });
  }

  const { data: entries, error: entriesError } = await supabase
    .from("entries")
    .select("title, source_url")
    .eq("vault_id", vaultId)
    .eq("user_id", user.id)
    .limit(100);

  if (entriesError) {
    return NextResponse.json({ error: entriesError.message }, { status: 500 });
  }

  const urls = (entries ?? [])
    .map((e) => e.source_url)
    .filter((v): v is string => Boolean(v));
  const titles = (entries ?? [])
    .map((e) => e.title)
    .filter((v): v is string => Boolean(v));

  const spam = scoreVaultForSpam({
    vaultName: vault.name,
    vaultDescription: vault.description,
    entryUrls: urls,
    entryTitles: titles,
  });

  const shouldQueueForReview = spam.score >= 4;

  const { error: updateError } = await supabase
    .from("vaults")
    .update({
      is_public: !shouldQueueForReview,
      public_status: shouldQueueForReview ? "pending" : "public",
      spam_score: spam.score,
      moderation_notes: spam.reasons.join("; ") || null,
      public_requested_at: new Date().toISOString(),
      last_reviewed_at: new Date().toISOString(),
    })
    .eq("id", vaultId)
    .eq("user_id", user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    status: shouldQueueForReview ? "pending" : "public",
    spamScore: spam.score,
    reasons: spam.reasons,
  });
}