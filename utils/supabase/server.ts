import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    'https://waujrrykwyodjqnhxzbl.supabase.co',
    'sb_publishable_khQhe7hCE3wooDE00U4PXA_7CAw4K6e',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // This can happen inside Server Components.
            // It is safe to ignore if middleware refreshes sessions.
          }
        },
      },
    }
  );
}