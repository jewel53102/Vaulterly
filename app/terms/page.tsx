import Link from "next/link";
import type { Metadata } from "next";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions that govern your use of Vaulterly.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/terms" },
};

const EFFECTIVE_DATE = "11 May 2026";
// TODO: Replace with your verified contact email before launch
const CONTACT_EMAIL = "legal@myvaulterly.com";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeaderAuth showNewVaultButton={false} />

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-slate-200 pb-8">
          <p className="mb-2 text-sm font-medium text-slate-500">Legal</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Effective date: {EFFECTIVE_DATE}
          </p>
        </header>

        <div className="prose-article space-y-8">

          <section>
            <h2>1. Acceptance of terms</h2>
            <p>
              By creating an account or using Vaulterly (&ldquo;the Service&rdquo;), you agree to
              these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, do
              not use the Service.
            </p>
            <p>
              We may update these Terms from time to time. Continued use of the Service
              after changes are posted constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2>2. Description of service</h2>
            <p>
              Vaulterly is a web application that allows users to save, organise, and
              share collections of links, sources, notes, and study materials
              (&ldquo;Vaults&rdquo;). The Service is provided free of charge. We reserve the right
              to introduce paid features, change features, or discontinue the Service at
              any time with reasonable notice.
            </p>
          </section>

          <section>
            <h2>3. Accounts</h2>
            <ul>
              <li>
                You must be at least 13 years old to create an account.
              </li>
              <li>
                You are responsible for maintaining the security of your account
                credentials. Do not share your password.
              </li>
              <li>
                You are responsible for all activity that occurs under your account.
              </li>
              <li>
                You must provide accurate information when creating your account. Fake
                or impersonation accounts are not permitted.
              </li>
              <li>
                You may only create one account per person. Creating multiple accounts
                to circumvent restrictions is prohibited.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. User content</h2>
            <p>
              You retain ownership of the content you save to Vaulterly, including vault
              titles, descriptions, saved URLs, notes, and tags (&ldquo;User Content&rdquo;).
            </p>
            <p>
              By saving content to Vaulterly, you grant us a limited, non-exclusive,
              royalty-free licence to store, display, and (where you have made a vault
              public) make that content accessible to other users and search engines.
              This licence ends when you delete the content or your account.
            </p>
            <p>
              You are solely responsible for the content you save. You must not save
              content that you do not have the right to save or share.
            </p>
          </section>

          <section>
            <h2>5. Acceptable use</h2>
            <p>You must not use Vaulterly to:</p>
            <ul>
              <li>
                Upload, save, or share content that is unlawful, harmful, abusive,
                harassing, defamatory, or fraudulent
              </li>
              <li>
                Infringe the intellectual property rights of others
              </li>
              <li>
                Distribute spam, malware, or malicious links
              </li>
              <li>
                Attempt to gain unauthorised access to any part of the Service or
                another user&apos;s account
              </li>
              <li>
                Scrape, crawl, or harvest data from the Service without our written
                permission
              </li>
              <li>
                Use the Service to build a competing product or to benchmark against a
                competing product without our permission
              </li>
              <li>
                Impersonate any person or entity, or falsely claim an affiliation with
                any person or entity
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Public vaults and content moderation</h2>
            <p>
              When you make a vault public, it becomes accessible to all users and
              visitors, including search engines. You are solely responsible for the
              content of your public vaults.
            </p>
            <p>
              We reserve the right to remove any public vault or content that we
              determine, at our sole discretion, violates these Terms or is otherwise
              harmful, misleading, or inappropriate. We may do so without prior notice.
            </p>
            <p>
              To report a vault that violates these Terms, use the report function on
              the vault page or contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </section>

          <section>
            <h2>7. Account termination</h2>
            <p>
              You may delete your account at any time from your account settings. Upon
              deletion, your profile, vaults, and vault entries will be removed within
              30 days.
            </p>
            <p>
              We reserve the right to suspend or terminate your account at any time if
              we determine you have violated these Terms, without prior notice and without
              liability to you. We will generally attempt to notify you by email before
              taking action, except where immediate action is required to protect the
              Service or other users.
            </p>
          </section>

          <section>
            <h2>8. Intellectual property</h2>
            <p>
              The Vaulterly name, logo, software, and design are owned by us and
              protected by applicable intellectual property law. You may not use our
              brand assets without written permission.
            </p>
            <p>
              Nothing in these Terms transfers any intellectual property rights to you
              beyond the limited licence to use the Service described herein.
            </p>
          </section>

          <section>
            <h2>9. Disclaimer of warranties</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of
              any kind, either express or implied. We do not warrant that the Service
              will be uninterrupted, error-free, or free of harmful components. We do
              not warrant the accuracy or completeness of any content on the Service.
            </p>
            <p>
              Your use of the Service is at your sole risk.
            </p>
          </section>

          <section>
            <h2>10. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, we shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising
              from your use of or inability to use the Service, including but not limited
              to loss of data, loss of revenue, or loss of goodwill.
            </p>
            <p>
              Our total liability to you for any claims arising under these Terms shall
              not exceed the amount you paid us in the 12 months prior to the claim
              (or, if you have not paid us anything, £50 / $50).
            </p>
          </section>

          <section>
            <h2>11. Governing law</h2>
            <p>
              {/* TODO: Update this clause to reflect your actual jurisdiction */}
              These Terms are governed by and construed in accordance with applicable
              law. Any disputes shall be resolved in the courts of the jurisdiction in
              which we are incorporated.
            </p>
          </section>

          <section>
            <h2>12. Contact</h2>
            <p>
              For questions about these Terms, contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </section>

        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-sm text-slate-500">
          <Link href="/privacy" className="font-medium text-[#4a7a9b] hover:underline">
            Privacy Policy
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
