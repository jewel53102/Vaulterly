import { createClient } from "@/utils/supabase/server";
import AppHeader from "./AppHeader";

type AppHeaderAuthProps = {
  title?: string;
  subtitle?: string;
  showNewVaultButton?: boolean;
};

export default async function AppHeaderAuth(props: AppHeaderAuthProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle<{ username: string | null }>();
    username = profile?.username ?? null;
  }

  return (
    <AppHeader
      {...props}
      isLoggedIn={!!user}
      userEmail={user?.email ?? ""}
      username={username ?? ""}
    />
  );
}
