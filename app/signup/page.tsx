"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <section className="auth-panel auth-panel-brand">
          <Link href="/" className="auth-brand">
            <div className="brand-mark" aria-hidden="true">
              <span className="brand-safe">
                <span className="brand-brain">◎</span>
              </span>
            </div>
            <div>
              <span className="brand-text">Vaulterly</span>
              <p className="auth-brand-tag">Organize. Save. Know More.</p>
            </div>
          </Link>

          <div className="auth-copy">
            <p className="eyebrow">Create Your Account</p>
            <h1>Start building your first vault.</h1>
            <p className="auth-lead">
              Save links, organize them with tags, add notes, and find what
              matters later without the mess.
            </p>

            <ul className="auth-benefits">
              <li>Keep your best sources in one place</li>
              <li>Add tags and notes for context</li>
              <li>Search what you saved later</li>
              <li>Start simple and grow your vault over time</li>
            </ul>
          </div>
        </section>

        <section className="auth-panel auth-panel-form">
          <div className="auth-card">
            <div className="auth-card-header">
              <p className="mini-label">Sign Up</p>
              <h2>Create your account</h2>
              <p>
                Get started with Vaulterly and organize the sources you
                actually want to keep.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              {errorMessage ? (
                <p className="form-message form-message-error">{errorMessage}</p>
              ) : null}

              {successMessage ? (
                <p className="form-message form-message-success">
                  {successMessage}
                </p>
              ) : null}

              <button
                type="submit"
                className="button button-primary auth-submit"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="button button-secondary auth-social"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              Continue with Google
            </button>

            <p className="auth-footer-text">
              Already have an account?{" "}
              <Link href="/login" className="auth-inline-link">
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

