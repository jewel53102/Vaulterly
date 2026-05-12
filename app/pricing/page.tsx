import Link from "next/link";
import type { Metadata } from "next";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";
import FoundingMemberCountdown from "@/app/components/FoundingMemberCountdown";
import CheckoutButton from "@/app/components/CheckoutButton";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Vaulterly is free for up to 3 vaults. Upgrade to Pro for unlimited vaults. Founding Member pricing available for a limited time.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing | Vaulterly",
    description:
      "Free for up to 3 vaults. Upgrade to Pro for $7/month or $55/year. Founding Member pricing available at launch.",
    url: "/pricing",
    siteName: "Vaulterly",
    type: "website",
    images: [
      {
        url: "/api/og?title=Vaulterly+Pricing&description=Free+for+up+to+3+vaults.+Upgrade+to+Pro+for+%247%2Fmonth+or+%2455%2Fyear.",
        width: 1200,
        height: 630,
        alt: "Vaulterly Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Vaulterly",
    description: "Free for up to 3 vaults. Upgrade to Pro for $7/month or $55/year.",
    images: ["/api/og?title=Vaulterly+Pricing&description=Free+for+up+to+3+vaults.+Upgrade+to+Pro+for+%247%2Fmonth+or+%2455%2Fyear."],
  },
};

// TODO: Set this to your actual launch date before going live.
// Founding Member pricing is shown until this date.
// Format: ISO 8601 — e.g. "2026-06-01T00:00:00Z"
const LAUNCH_DEADLINE = "2026-06-14T00:00:00Z";

const FREE_FEATURES = [
  "Up to 3 vaults",
  "Unlimited entries per vault",
  "Copy vault context for AI",
  "Public & private vaults",
  "Tags, notes & search",
  "Share vault links",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Unlimited vaults",
  "Priority support",
];

const FOUNDING_FEATURES = [
  "Everything in Pro",
  "Unlimited vaults — forever",
  "Priority support",
  "Locked in before price increases",
];

const FAQ = [
  {
    q: "What happens when I hit 3 vaults on the free plan?",
    a: "You can still use your existing vaults — add entries, copy context, share links. You just can't create a fourth vault until you upgrade or delete one.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly plans cancel immediately with no further charges. Annual plans are non-refundable but you keep access until the end of your billing year.",
  },
  {
    q: "What is Founding Member pricing?",
    a: "Founding Member is a one-time offer for people who sign up within the first 14 days of launch. You pay $34/year — forever, regardless of future price increases. It never auto-upgrades to standard pricing.",
  },
  {
    q: "Is the Founding Member price really locked in forever?",
    a: "Yes. As long as your subscription is active and you don't cancel, your rate stays at $34/year. If you cancel and re-subscribe, you'd pay the current rate at that time.",
  },
  {
    q: "Do you offer student discounts?",
    a: "The free plan is designed to cover most student use cases. If you need more than 3 vaults, Pro at $7/month works out to less than a coffee per month.",
  },
];

export default function PricingPage() {
  const isFoundingMemberLive = new Date() < new Date(LAUNCH_DEADLINE);

  return (
    <>
      <AppHeaderAuth />

      <main className="min-h-screen bg-slate-50">

        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-4 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                Pricing
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Free to start. Upgrade when you need more.
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Build your first three vaults for free — no card required. Upgrade to Pro for unlimited vaults.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className={`grid gap-6 ${isFoundingMemberLive ? "lg:grid-cols-3" : "mx-auto max-w-3xl lg:grid-cols-2"}`}>

            {/* Free */}
            <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Free</p>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-5xl font-bold tracking-tight text-slate-950">$0</span>
                <span className="mb-1.5 text-sm text-slate-500">/ forever</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                For students who want to try Vaulterly and build their first vaults.
              </p>
              <Link
                href="/signup"
                className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Get started free
              </Link>
              <ul className="mt-8 space-y-3">
                {FREE_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="flex flex-col rounded-3xl border border-[#d8e8f5] bg-[#ebf2f8] p-7 shadow-sm">
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#4a7a9b]">Pro</p>
                <span className="rounded-full bg-[#4a7a9b] px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold tracking-tight text-slate-950">$7</span>
                  <span className="mb-1.5 text-sm text-slate-500">/ month</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[#4a7a9b]">
                  or $55/year — save 34%
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                For students who are serious about staying organized across all their classes.
              </p>
              <CheckoutButton
                priceKey="pro_annual"
                label="Get Pro — $55/year"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <p className="mt-2 text-center text-xs text-slate-500">
                or{" "}
                <CheckoutButton
                  priceKey="pro_monthly"
                  label="$7/month"
                  className="font-medium text-[#4a7a9b] hover:underline disabled:opacity-60"
                />
              </p>
              <ul className="mt-8 space-y-3">
                {PRO_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4a7a9b] text-xs text-white">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Founding Member — only shown before deadline */}
            {isFoundingMemberLive && (
              <div className="flex flex-col rounded-3xl bg-slate-950 p-7 shadow-sm">
                <div className="flex items-start justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#93c5e8]">Founding Member</p>
                  <span className="rounded-full bg-[#779EBF] px-3 py-1 text-xs font-semibold text-white">
                    Limited time
                  </span>
                </div>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-5xl font-bold tracking-tight text-white">$34</span>
                  <span className="mb-1.5 text-sm text-slate-400">/ year</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[#93c5e8]">
                  Locked in forever — never increases
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  For early supporters who want Pro access at a permanent rate, regardless of future pricing.
                </p>

                <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Offer expires in
                </p>
                <FoundingMemberCountdown deadline={LAUNCH_DEADLINE} />

                <CheckoutButton
                  priceKey="founding"
                  label="Claim Founding Member pricing"
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#779EBF] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5a87ac] disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <ul className="mt-8 space-y-3">
                  {FOUNDING_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#779EBF] text-xs text-white">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Feature comparison */}
        <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left font-semibold text-slate-700">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-700">Free</th>
                  <th className="px-6 py-4 text-center font-semibold text-[#4a7a9b]">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Vaults", "3", "Unlimited"],
                  ["Entries per vault", "Unlimited", "Unlimited"],
                  ["Copy vault context for AI", "✓", "✓"],
                  ["Public & private vaults", "✓", "✓"],
                  ["Tags, notes & search", "✓", "✓"],
                  ["Share vault links", "✓", "✓"],
                  ["Priority support", "—", "✓"],
                ].map(([feature, free, pro]) => (
                  <tr key={feature as string}>
                    <td className="px-6 py-3.5 text-slate-700">{feature}</td>
                    <td className="px-6 py-3.5 text-center text-slate-500">{free}</td>
                    <td className="px-6 py-3.5 text-center font-medium text-[#4a7a9b]">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                FAQ
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Common questions about pricing.
              </h2>
            </div>
            <div className="grid gap-5">
              {FAQ.map((item) => (
                <div key={item.q} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-base font-bold text-slate-950">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-4 py-12 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-950 p-8 text-center sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Start free. No card required.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-300">
              Build your first three vaults today. Upgrade to Pro when you need more.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#779EBF] transition hover:bg-slate-100"
            >
              Build your study vault — free
            </Link>
          </div>
        </section>

      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://myvaulterly.com" },
              { "@type": "ListItem", position: 2, name: "Pricing", item: "https://myvaulterly.com/pricing" },
            ],
          }),
        }}
      />
    </>
  );
}
