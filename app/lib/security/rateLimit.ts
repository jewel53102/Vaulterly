import type { SupabaseClient } from "@supabase/supabase-js";
import { floorWindowStart } from "./antiSpam";

type ConsumeRateLimitArgs = {
  supabase: SupabaseClient;
  userId: string;
  action: string;
  limit: number;
  windowMinutes: number;
};

export async function consumeRateLimit({
  supabase,
  userId,
  action,
  limit,
  windowMinutes,
}: ConsumeRateLimitArgs) {
  const windowStart = floorWindowStart(new Date(), windowMinutes);

  const { data: existing, error: readError } = await supabase
    .from("rate_limits")
    .select("id, count")
    .eq("user_id", userId)
    .eq("action", action)
    .eq("window_start", windowStart)
    .maybeSingle();

  if (readError) {
    throw new Error(readError.message);
  }

  if (!existing) {
    const { error: insertError } = await supabase.from("rate_limits").insert({
      user_id: userId,
      action,
      window_start: windowStart,
      count: 1,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    return { allowed: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  const { error: updateError } = await supabase
    .from("rate_limits")
    .update({
      count: existing.count + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existing.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { allowed: true, remaining: limit - (existing.count + 1) };
}