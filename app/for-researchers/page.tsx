import type { Metadata } from "next";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";
import CheckoutButton from "@/app/components/CheckoutButton";
import FoundingMemberCountdown from "@/app/components/FoundingMemberCountdown";

export const metadata: Metadata = {
  title: "Vaulterly for Researchers & Writers — Stop Losing Your Best Sources",
  description:
    "A private research vault for professionals who read deeply and think for a living. Capture sources, build context, and get AI insight that's actually grounded in your work.",
  alternates: { canonical: "/for-researchers" },
};

const LAUNCH_DEADLINE = "2026-07-14T00:00:00Z";

export default function ForResearchersPage() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeaderAuth />

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 text-center max-w-3xl mx-auto">
        <div
          className="inline-block text-sm font-medium px-3 py-1 rounded-full mb-6"
          style={{ background: "#F1DFCA", color: "#553F28" }}
        >
          For researchers, writers & independent thinkers
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
          Stop losing your research between{" "}
          <span style={{ color: "#F69149" }}>finding it and using it</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed mb-10">
          You read broadly. You bookmark, highlight, and tab-hoard. But when it's
          time to write or decide, the right source is always buried somewhere you
          can't find. Vaulterly is a private research vault that holds everything
          together — and surfaces it when you actually need it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-opacity hover:opacity-90"
            style={{ background: "#F69149" }}
          >
            Start your research vault — free
          </a>
          <a
            href="#pricing"
            className="px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-colors hover:bg-slate-50"
            style={{ borderColor: "#779EBF", color: "#553F28" }}
          >
            See Founding Member pricing
          </a>
        </div>
      </section>

      {/* Mock vault */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <div
          className="rounded-2xl border overflow-hidden shadow-sm"
          style={{ borderColor: "#F1DFCA" }}
        >
          {/* Vault header */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ background: "#F1DFCA" }}
          >
            <div>
              <div className="font-semibold text-slate-800">
                Institutional Memory & AI Risk — Research Vault
              </div>
              <div className="text-sm" style={{ color: "#553F28" }}>
                47 sources · Last updated today
              </div>
            </div>
            <div
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: "#779EBF", color: "white" }}
            >
              Private
            </div>
          </div>
          {/* Vault entries */}
          <div className="divide-y divide-slate-100">
            {[
              {
                type: "Paper",
                title:
                  "The risks of machine learning systems trained on proxy rewards (Goodhart's Law applications)",
                source: "NeurIPS 2024",
                tag: "Foundational",
                tagColor: "#553F28",
              },
              {
                type: "Article",
                title:
                  "Inside the EU AI Act: What the liability provisions actually say (vs. how they're being reported)",
                source: "Wired, annotated",
                tag: "Policy",
                tagColor: "#779EBF",
              },
              {
                type: "Interview",
                title:
                  'Transcript: "Organizational knowledge gaps in AI deployment" — Anthropic policy team, March 2026',
                source: "Personal notes",
                tag: "Primary source",
                tagColor: "#F69149",
              },
              {
                type: "Book",
                title:
                  "Atlas of AI — Crawford (Ch. 4–6 excerpts + margin notes)",
                source: "Highlighted PDF",
                tag: "Background",
                tagColor: "#553F28",
              },
            ].map((entry, i) => (
              <div
                key={i}
                className="px-6 py-4 flex items-start gap-4 hover:bg-slate-50 transition-colors"
              >
                <div
                  className="text-xs font-medium px-2 py-0.5 rounded mt-0.5 shrink-0"
                  style={{ background: "#F1DFCA", color: "#553F28" }}
                >
                  {entry.type}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-800 leading-snug">
                    {entry.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {entry.source}
                  </div>
                </div>
                <div
                  className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: entry.tagColor + "20", color: entry.tagColor }}
                >
                  {entry.tag}
                </div>
              </div>
            ))}
          </div>
          {/* AI insight bar */}
          <div
            className="px-6 py-4"
            style={{ background: "#553F28" }}
          >
            <div className="text-xs font-medium mb-2" style={{ color: "#D1AC65" }}>
              AI INSIGHT · from your 47 sources
            </div>
            <div className="text-sm text-white leading-relaxed">
              "Your sources on proxy reward misalignment (Goodhart, Leike 2022) and
              the EU liability framework suggest a tension the mainstream coverage
              misses: the Act regulates{" "}
              <em>deployed</em> systems, not training objectives. Your Crawford
              excerpts on labor displacement may be the strongest bridge argument..."
            </div>
          </div>
        </div>
      </section>

      {/* Problem section */}
      <section
        className="px-6 py-20"
        style={{ background: "#F1DFCA" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            The problem isn't that you don't read enough
          </h2>
          <p className="text-lg text-slate-600 mb-12 leading-relaxed">
            It's that the reading doesn't compound. Every source you consume gets
            siloed — browser bookmarks, Kindle highlights, Notion dumps, PDFs with
            no context. When you finally sit down to write, you're reconstructing
            from memory instead of building on what you already know.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: "📂",
                heading: "One place for everything",
                body: "Papers, articles, interviews, book excerpts, your own notes — all tagged, searchable, and connected inside a single vault.",
              },
              {
                icon: "🔍",
                heading: "Find it when it matters",
                body: "Search across your entire research history. Not just titles — the substance of what you saved and why it was relevant.",
              },
              {
                icon: "🧠",
                heading: "AI that knows your context",
                body: "Ask questions and get synthesis that's grounded in your actual sources. Not generic answers — answers from your vault.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-semibold text-slate-800 mb-2">
                  {item.heading}
                </div>
                <div className="text-sm text-slate-600 leading-relaxed">
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI section */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <div className="sm:grid sm:grid-cols-2 sm:gap-16 sm:items-center">
          <div>
            <div
              className="text-sm font-medium mb-4"
              style={{ color: "#F69149" }}
            >
              WHY AI GIVES YOU GENERIC OUTPUT
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              It's not the prompt. It's the missing context.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              When you ask an AI to help with your research, it answers from its
              training data — not yours. It doesn't know which sources you trust,
              which arguments you've already ruled out, or what gap you're actually
              trying to fill.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Vaulterly changes that. When you ask a question, the AI searches your
              vault first. It surfaces the sources most relevant to your query,
              shows you where they agree and conflict, and synthesizes across
              everything you've already read.
            </p>
            <p className="font-medium" style={{ color: "#553F28" }}>
              The result is analysis that sounds like you — because it's built on
              your work.
            </p>
          </div>
          <div
            className="mt-10 sm:mt-0 rounded-2xl p-6"
            style={{ background: "#553F28" }}
          >
            <div
              className="text-xs font-medium mb-3 tracking-wide"
              style={{ color: "#D1AC65" }}
            >
              VAULT QUERY
            </div>
            <div className="text-white text-sm mb-5 font-medium">
              "What's the strongest argument against the AI liability framing I'm using?"
            </div>
            <div className="h-px mb-5" style={{ background: "#779EBF40" }} />
            <div
              className="text-xs font-medium mb-2 tracking-wide"
              style={{ color: "#779EBF" }}
            >
              SYNTHESIZED FROM YOUR 47 SOURCES
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "#F1DFCA" }}>
              "Based on your Wired annotation and the NeurIPS paper — the strongest
              counter is temporal: liability frameworks assume you can isolate a
              failure event, but reward misalignment is cumulative. Your Crawford
              notes touch this in Ch. 5 but don't follow through. That's the gap."
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section
        className="px-6 py-20"
        style={{ background: "#F1DFCA" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Built for people who think for a living
          </h2>
          <p className="text-lg text-slate-600 mb-12">
            Vaulterly works for any professional whose output depends on how well
            they've absorbed their inputs.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {[
              {
                role: "Independent researchers",
                desc: "Track literature across long-running projects without losing the thread between sessions.",
              },
              {
                role: "Journalists & writers",
                desc: "Maintain living source files per story. Ask questions across everything you've read on a beat.",
              },
              {
                role: "Policy analysts",
                desc: "Synthesize across legislation, studies, and commentary. Surface contradictions before your deadline does.",
              },
              {
                role: "Consultants & strategists",
                desc: "Build a personal knowledge base that gets more useful the longer you use it.",
              },
              {
                role: "PhD students & academics",
                desc: "Lit review, annotation, and AI-assisted synthesis — all in one place, not four apps.",
              },
              {
                role: "Curious professionals",
                desc: "You read a lot. Now make it compound. Every article saved becomes part of something bigger.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm flex gap-3"
              >
                <div
                  className="w-2 rounded-full shrink-0 mt-1"
                  style={{ background: "#F69149", minHeight: "20px" }}
                />
                <div>
                  <div className="font-semibold text-slate-800 mb-1">
                    {item.role}
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Lock in founding pricing before launch
          </h2>
          <p className="text-lg text-slate-600">
            We're launching June 30. Early members get the founding rate — locked
            forever, regardless of what pricing looks like after.
          </p>
          <div className="mt-6">
            <FoundingMemberCountdown deadline={LAUNCH_DEADLINE} />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* Founding Member */}
          <div
            className="sm:col-span-2 rounded-2xl p-8 relative overflow-hidden"
            style={{ background: "#0f172a" }}
          >
            <div
              className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: "#D1AC65", color: "#553F28" }}
            >
              Best value
            </div>
            <div
              className="text-sm font-medium mb-2 tracking-wide"
              style={{ color: "#779EBF" }}
            >
              FOUNDING MEMBER
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-5xl font-bold text-white">$34</span>
              <span className="text-slate-400">/year</span>
            </div>
            <div
              className="text-sm mb-6"
              style={{ color: "#D1AC65" }}
            >
              Locked forever — price never increases
            </div>
            <ul className="space-y-2 mb-8">
              {[
                "Unlimited sources & vaults",
                "AI synthesis from your vault",
                "Full-text search across everything",
                "Tags, annotations & collections",
                "Priority support",
                "All future features included",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <span style={{ color: "#779EBF" }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <CheckoutButton
              priceKey="founding"
              label="Claim Founding Member — $34/year"
              className="w-full py-4 rounded-lg font-semibold text-slate-900 text-lg transition-opacity hover:opacity-90 bg-[#F69149]"
            />
            <p className="text-xs text-slate-500 text-center mt-3">
              Available until July 14, 2026 · Cancel anytime
            </p>
          </div>

          {/* Pro Annual */}
          <div
            className="rounded-2xl p-6 border-2 flex flex-col"
            style={{ borderColor: "#779EBF" }}
          >
            <div
              className="text-sm font-medium mb-2 tracking-wide"
              style={{ color: "#779EBF" }}
            >
              PRO
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-slate-900">$55</span>
              <span className="text-slate-500 text-sm">/year</span>
            </div>
            <div className="text-sm text-slate-500 mb-4">or $7/month</div>
            <ul className="space-y-2 mb-6 flex-1">
              {[
                "Unlimited sources & vaults",
                "AI synthesis",
                "Full-text search",
                "Tags & collections",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                  <span style={{ color: "#F69149" }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <CheckoutButton
              priceKey="pro_annual"
              label="Start Pro — $55/year"
              className="w-full py-3 rounded-lg font-semibold text-white text-sm transition-opacity hover:opacity-90 bg-[#779EBF]"
            />
            <div className="mt-3">
              <CheckoutButton
                priceKey="pro_monthly"
                label="$7/month instead"
                className="w-full py-2 rounded-lg text-sm transition-colors hover:bg-slate-50 text-slate-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="px-6 py-20 text-center"
        style={{ background: "#553F28" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Your research is only as useful as you can find it
          </h2>
          <p className="text-lg mb-10" style={{ color: "#F1DFCA" }}>
            Start with a free vault. No credit card. Add your first source in two
            minutes.
          </p>
          <a
            href="/signup"
            className="inline-block px-10 py-4 rounded-lg text-white font-semibold text-lg transition-opacity hover:opacity-90"
            style={{ background: "#F69149" }}
          >
            Start your research vault
          </a>
          <p className="text-sm mt-4" style={{ color: "#D1AC65" }}>
            Free forever on the starter plan · Upgrade when you're ready
          </p>
        </div>
      </section>
    </div>
  );
}
