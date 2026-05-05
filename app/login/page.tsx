"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error || !data.user) {
      setErrorMessage(error?.message || "Could not log you in.");
      setIsLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profileError) {
      setErrorMessage(profileError.message);
      setIsLoading(false);
      return;
    }

    if (!profile) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email: data.user.email,
        onboarding_completed: false,
      });

      router.push("/onboarding");
      router.refresh();
      return;
    }

    if (!profile.onboarding_completed) {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }

    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-xl font-bold text-slate-950">
            Vaulterly
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Log in
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Welcome back. Log in to continue building your vaults.
          </p>

          {errorMessage && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
