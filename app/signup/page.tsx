"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useUsernameCheck } from "@/app/hooks/useUsernameCheck";

function generateUsername(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 30);
}

export default function SignupPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const proposedUsername = generateUsername(name);
  const usernameStatus = useUsernameCheck(proposedUsername);

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (user) {
      await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        display_name: name,
        username: generateUsername(name),
      });
    }

    setSuccessMessage(
      "Account created. Check your email if confirmation is required."
    );
    setLoading(false);

    router.push("/onboarding");
    router.refresh();
  }

  async function handleGoogleSignup() {
    setLoading(true);
    setErrorMessage("");

    const origin =
      typeof window !== "undefined" ? window.location.origin : "";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  const benefits = [
    "Keep your best sources in one place",
    "Add tags and notes for context",
    "Search what you saved later",
    "Start simple and grow your vault over time",
  ];

  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      {/* Brand panel — desktop only */}
      <section className="hidden flex-col justify-between bg-slate-950 px-12 py-16 lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
            ◎
          </span>
          <div>
            <p className="text-base font-bold text-white">Vaulterly</p>
            <p className="text-xs text-slate-400">Organize. Save. Know More.</p>
          </div>
        </Link>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Create Your Account
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Start building your first vault.
          </h1>
          <p className="mt-4 leading-7 text-slate-400">
            Save links, organize them with tags, add notes, and find what
            matters later without the mess.
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} Vaulterly
        </p>
      </section>

      {/* Form panel */}
      <section className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="text-xl font-bold text-slate-950">
              Vaulterly
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Sign Up
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Get started with Vaulterly and organize the sources you actually
              want to keep.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
                {proposedUsername.length >= 2 && (
                  <p className="mt-1.5 text-xs text-slate-500">
                    Your username will be{" "}
                    <span className="font-medium text-slate-700">@{proposedUsername}</span>
                    {usernameStatus === "checking" && (
                      <span className="ml-1 text-slate-400">— checking...</span>
                    )}
                    {usernameStatus === "available" && (
                      <span className="ml-1 text-green-600">✓ available</span>
                    )}
                    {usernameStatus === "taken" && (
                      <span className="ml-1 text-red-600">✗ already taken — try a different name</span>
                    )}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading || usernameStatus === "taken"}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs font-medium uppercase tracking-wider text-slate-400">
                  Or
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
