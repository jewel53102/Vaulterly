import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Free Account — Start Your Study Vault",
  description:
    "Sign up for Vaulterly free. Build a research vault for every class, save sources and study links, and organize everything in one place.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
