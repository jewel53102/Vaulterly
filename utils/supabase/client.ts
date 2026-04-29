import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    'https://waujrrykwyodjqnhxzbl.supabase.co',
    'sb_publishable_khQhe7hCE3wooDE00U4PXA_7CAw4K6e'
  );
}