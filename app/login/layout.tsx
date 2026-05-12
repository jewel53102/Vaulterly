import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In to Your Study Vault",
  description:
    "Log in to Vaulterly and access your research vaults, saved sources, and study notes.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
