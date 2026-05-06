import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export type UsernameStatus = "idle" | "checking" | "available" | "taken";

export function useUsernameCheck(username: string, excludeUserId?: string): UsernameStatus {
  const [status, setStatus] = useState<UsernameStatus>("idle");

  useEffect(() => {
    const cleaned = username.trim().toLowerCase();

    if (cleaned.length < 2) {
      setStatus("idle");
      return;
    }

    setStatus("checking");

    const timer = setTimeout(async () => {
      const supabase = createClient();
      let query = supabase.from("profiles").select("id").eq("username", cleaned);
      if (excludeUserId) query = query.neq("id", excludeUserId);
      const { data } = await query.maybeSingle();
      setStatus(data ? "taken" : "available");
    }, 400);

    return () => clearTimeout(timer);
  }, [username, excludeUserId]);

  return status;
}
