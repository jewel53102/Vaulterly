import Link from "next/link";
import type { Metadata } from "next";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Vaulterly collects, uses, and protects your personal information.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE_DATE = "11 May 2026";
// TODO: Replace with your verified contact email before launch
const CONTACT_EMAIL = "privacy@myvaulterly.com";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeaderAuth showNewVaultButton={false} />

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-slate-200 pb-8">
          <p className="mb-2 text-sm font-medium text-slate-500">Legal</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </header>

        <div className="prose-article space-y-8">

          <section>
            <h2>1. Who we are</h2>
            <p>
              Vaulterly (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website at{" "}
              <strong>myvaulterly.com</strong> and the Vaulterly application. This Privacy
              Policy explains how we collect, use, and protect information about you when
              you use our service.
            </p>
            <p>
              If you have questions about this policy, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2>2. Information we collect</h2>

            <h3>Information you provide</h3>
            <ul>
              <li>
                <strong>Account information:</strong> When you sign up, we collect your name,
                email address, and password (hashed — we never store it in plain text), or
                your Google account name and email if you use Google sign-in.
              </li>
              <li>
                <strong>Profile information:</strong> Username, display name, bio, and
                website URL, if you choose to add them.
              </li>
              <li>
                <strong>Vault content:</strong> The source titles, URLs, notes, and tags you
                save to your vaults.
              </li>
            </ul>

            <h3>Information collected automatically</h3>
            <ul>
              <li>
                <strong>Usage data:</strong> We use Google Analytics and Vercel Analytics
                to collect page view data (pages visited, referrer, approximate location,
                browser type, device type). Google Analytics may associate this data with
                a cookie or device identifier. Vercel Analytics collects anonymised
                aggregate data only.
              </li>
              <li>
                <strong>Authentication logs:</strong> Our authentication provider (Supabase)
                logs sign-in events, IP addresses, and session tokens as part of securing
                your account.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How we use your information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Create and manage your account</li>
              <li>Provide and improve the Vaulterly service</li>
              <li>Display public vaults and profiles if you choose to make them public</li>
              <li>Send transactional emails (email confirmation, password reset)</li>
              <li>Detect and prevent abuse, spam, and fraudulent activity</li>
              <li>Understand how the service is used in aggregate (via Vercel Analytics)</li>
            </ul>
            <p>
              We do not sell your personal information. We do not use your vault content
              to train AI models. We do not send marketing emails unless you explicitly
              opt in to them.
            </p>
          </section>

          <section>
            <h2>4. Third-party services</h2>
            <p>
              Vaulterly relies on the following third-party services to operate. Each has
              its own privacy policy:
            </p>
            <ul>
              <li>
                <strong>Supabase</strong> — database, authentication, and file storage.
                Your account data and vault content are stored on Supabase infrastructure.
              </li>
              <li>
                <strong>Google OAuth</strong> — if you sign in with Google, Google shares
                your name and email address with us. Your use of Google sign-in is subject
                to Google&apos;s Privacy Policy.
              </li>
              <li>
                <strong>Google Analytics</strong> — we use Google Analytics 4 to understand
                how visitors use the site. Google Analytics uses cookies and may process
                your IP address and browsing behaviour. See{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                  Google&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Vercel</strong> — our hosting provider. Vercel Analytics collects
                anonymised usage data. Vercel processes request logs as part of hosting.
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Public vaults and content</h2>
            <p>
              If you mark a vault as public, its contents (title, description, saved
              entries, and notes) are visible to anyone with the URL, including
              unauthenticated visitors and search engines. Making a vault public is your
              choice. You can make it private again at any time from the vault settings.
            </p>
            <p>
              Public vault content may be indexed by search engines. If you later make a
              vault private, it will no longer be accessible via Vaulterly, but cached
              copies may persist in search engine indexes for a period of time.
            </p>
          </section>

          <section>
            <h2>6. Data retention</h2>
            <p>
              We retain your account data and vault content for as long as your account
              is active. If you delete your account, we will delete your profile and vault
              data within 30 days. Anonymised analytics data may be retained indefinitely.
            </p>
          </section>

          <section>
            <h2>7. Your rights</h2>
            <p>You may at any time:</p>
            <ul>
              <li>Access and update your account information from your account settings</li>
              <li>Delete individual vault entries or entire vaults</li>
              <li>Delete your account from your account settings page</li>
              <li>
                Request a copy of your personal data by emailing{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </section>

          <section>
            <h2>8. Cookies</h2>
            <p>
              Vaulterly uses a session cookie to keep you signed in. This is a strictly
              necessary cookie and cannot be disabled without breaking authentication. We
              do not use advertising cookies or third-party tracking cookies.
            </p>
          </section>

          <section>
            <h2>9. Children&apos;s privacy</h2>
            <p>
              Vaulterly is not directed at children under 13. We do not knowingly collect
              personal information from children under 13. If you believe a child under 13
              has provided us with personal information, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will delete it.
            </p>
          </section>

          <section>
            <h2>10. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material
              changes, we will update the effective date at the top of this page. Your
              continued use of Vaulterly after any changes constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section>
            <h2>11. Contact</h2>
            <p>
              For privacy-related questions or requests, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </section>

        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-sm text-slate-500">
          <Link href="/terms" className="font-medium text-[#4a7a9b] hover:underline">
            Terms of Service
          </Link>
          {" · "}
          <Link href="/" className="hover:underline">
            Back to Vaulterly
          </Link>
        </div>
      </main>
    </div>
  );
}
