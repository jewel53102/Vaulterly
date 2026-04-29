"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

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
    <main style={pageStyle}>
      <div style={containerStyle}>
        <section style={cardStyle}>
          <h1 style={headingStyle}>Log in</h1>

          <p style={bodyStyle}>
            Welcome back. Log in to continue building your vaults.
          </p>

          {errorMessage && <div style={errorStyle}>{errorMessage}</div>}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...primaryButtonStyle,
                opacity: isLoading ? 0.6 : 1,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p style={{ marginTop: "20px", color: "#57534e" }}>
            Don’t have an account?{" "}
            <Link href="/signup" style={{ color: "#92400e", fontWeight: 700 }}>
              Sign up
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f8f5ee",
  padding: "40px 20px",
  color: "#1c1917",
  fontFamily:
    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "520px",
  margin: "0 auto",
};

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e7e0d6",
  borderRadius: "28px",
  padding: "32px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
};

const headingStyle: React.CSSProperties = {
  fontSize: "40px",
  lineHeight: "1.1",
  margin: 0,
  color: "#1c1917",
  fontWeight: 800,
};

const bodyStyle: React.CSSProperties = {
  marginTop: "12px",
  marginBottom: "24px",
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#57534e",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "8px",
  fontSize: "14px",
  fontWeight: 700,
  color: "#292524",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #ddd6ce",
  background: "#fafaf9",
  color: "#1c1917",
  borderRadius: "16px",
  padding: "14px 16px",
  fontSize: "15px",
  outline: "none",
};

const primaryButtonStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  background: "#1c1917",
  color: "#ffffff",
  padding: "14px 24px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: 700,
};

const errorStyle: React.CSSProperties = {
  marginBottom: "20px",
  border: "1px solid #fecaca",
  background: "#fef2f2",
  color: "#b91c1c",
  padding: "12px 16px",
  borderRadius: "16px",
  fontSize: "14px",
  fontWeight: 600,
};