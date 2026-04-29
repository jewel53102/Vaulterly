"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/components/AppHeader";
import { createClient } from "@/app/lib/supabase/client";

type StarterVault = {
  id: "exam" | "internship" | "semester";
  label: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  examples: {
    title: string;
    source: string;
    usefulness: string;
  }[];
};

const STARTER_VAULTS: StarterVault[] = [
  {
    id: "exam",
    label: "Best for studying",
    title: "Ace Your Next Exam",
    description:
      "Collect study guides, lecture notes, review videos, Quizlets, and important resources in one place.",
    category: "Study",
    tags: ["Study Guide", "Review", "Important"],
    examples: [
      {
        title: "Biology Midterm Study Guide",
        source: "Paste a link or quick note here",
        usefulness: "Covers chapters 1–4",
      },
      {
        title: "Crash Course Review Video",
        source: "https://example.com",
        usefulness: "Helpful overview before reviewing notes",
      },
      {
        title: "Professor’s Exam Notes",
        source: "Remember to review lecture slides from Week 3",
        usefulness: "Likely exam topics",
      },
    ],
  },
  {
    id: "internship",
    label: "Best for career prep",
    title: "Land an Internship",
    description:
      "Save job posts, resume examples, portfolio links, company research, and interview prep resources.",
    category: "Career",
    tags: ["Career", "Application", "Interview Prep"],
    examples: [
      {
        title: "Summer Internship Posting",
        source: "Paste the job link here",
        usefulness: "Good match for my experience",
      },
      {
        title: "Resume Example",
        source: "https://example.com",
        usefulness: "Use as structure for my own resume",
      },
      {
        title: "Interview Prep Questions",
        source: "Practice behavioral answers before applying",
        usefulness: "Helps me prepare faster",
      },
    ],
  },
  {
    id: "semester",
    label: "Best for class organization",
    title: "Organize This Semester",
    description:
      "Keep syllabi, class links, assignment instructions, tools, deadlines, and resources together.",
    category: "School",
    tags: ["Class Resource", "Assignment", "Tool"],
    examples: [
      {
        title: "English 201 Syllabus",
        source: "Paste a link or quick note here",
        usefulness: "Has deadlines and grading info",
      },
      {
        title: "Group Project Instructions",
        source: "https://example.com",
        usefulness: "Need this for the final project",
      },
      {
        title: "Citation Generator",
        source: "https://example.com",
        usefulness: "Useful for papers this semester",
      },
    ],
  },
];

type StarterEntry = {
  title: string;
  source: string;
  usefulness: string;
};

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedVaultId, setSelectedVaultId] =
    useState<StarterVault["id"]>("exam");
  const [entries, setEntries] = useState<StarterEntry[]>(
    STARTER_VAULTS[0].examples
  );
  const [createdVaultId, setCreatedVaultId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedVault = useMemo(
    () =>
      STARTER_VAULTS.find((vault) => vault.id === selectedVaultId) ??
      STARTER_VAULTS[0],
    [selectedVaultId]
  );

  function chooseVault(vault: StarterVault) {
    setSelectedVaultId(vault.id);
    setEntries(vault.examples);
    setErrorMessage("");
    setStep(2);
  }

  function updateEntry(
    index: number,
    field: keyof StarterEntry,
    value: string
  ) {
    setEntries((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry
      )
    );
  }

  async function createStarterVault() {
    setErrorMessage("");
    setIsSaving(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You must be logged in to create your first vault.");
      setIsSaving(false);
      return;
    }

    const { data: vault, error: vaultError } = await supabase
      .from("vaults")
      .insert({
        user_id: user.id,
        name: selectedVault.title,
        title: selectedVault.title,
        description: selectedVault.description,
        category: selectedVault.category,
        tags: selectedVault.tags,
        is_public: false,
        public_status: "private",
      })
      .select("id")
      .single();

    if (vaultError || !vault) {
      setErrorMessage(vaultError?.message ?? "Could not create your vault.");
      setIsSaving(false);
      return;
    }

    const cleanedEntries = entries
      .map((entry) => ({
        title: entry.title.trim(),
        source: entry.source.trim(),
        usefulness: entry.usefulness.trim(),
      }))
      .filter((entry) => entry.title.length > 0);

    if (cleanedEntries.length > 0) {
      const { data: createdEntries, error: entriesError } = await supabase
        .from("entries")
        .insert(
          cleanedEntries.map((entry) => {
            const sourceLooksLikeUrl =
              entry.source.startsWith("http://") ||
              entry.source.startsWith("https://");

            return {
              vault_id: vault.id,
              user_id: user.id,
              entry_type: sourceLooksLikeUrl ? "url" : "note",
              title: entry.title,
              source_url: sourceLooksLikeUrl ? entry.source : null,
              url: sourceLooksLikeUrl ? entry.source : null,
              description: entry.usefulness || null,
              notes: sourceLooksLikeUrl
                ? entry.usefulness || null
                : [entry.source, entry.usefulness].filter(Boolean).join("\n\n"),
              metadata_status: "pending",
            };
          })
        )
        .select("id");

      if (entriesError) {
        setErrorMessage(entriesError.message);
        setIsSaving(false);
        return;
      }

      const { data: createdTags, error: tagsError } = await supabase
        .from("tags")
        .insert(
          selectedVault.tags.map((tagName) => ({
            user_id: user.id,
            name: tagName,
          }))
        )
        .select("id, name");

      if (!tagsError && createdTags && createdEntries) {
        const firstTag = createdTags[0];

        if (firstTag) {
          await supabase.from("entry_tags").insert(
            createdEntries.map((entry) => ({
              entry_id: entry.id,
              tag_id: firstTag.id,
            }))
          );
        }
      }
    }

    await supabase
      .from("profiles")
      .update({ onboarding_completed: true })
      .eq("id", user.id);

    setCreatedVaultId(vault.id);
    setIsSaving(false);
    setStep(3);
    router.refresh();
  }

  return (
    <>
      <AppHeader
        title="Onboarding"
        subtitle="Build your first useful vault"
        showNewVaultButton={false}
      />

      <main className="dashboard-page">
        <section className="dashboard-hero">
          <div>
            <p className="eyebrow">Vaulterly Onboarding</p>
            <h1 className="dashboard-title">
              Don’t just save information. Build something with it.
            </h1>
            <p className="dashboard-subtitle">
              In a few minutes, you’ll turn scattered links, notes, videos, and
              resources into your first organized vault.
            </p>
          </div>

          <div className="onboarding-progress-pill">Step {step} of 3</div>
        </section>

        {errorMessage ? (
          <section className="dashboard-card">
            <p className="form-message form-message-error">{errorMessage}</p>
          </section>
        ) : null}

        {step === 1 ? (
          <section className="dashboard-section">
            <div className="dashboard-section-header">
              <div>
                <h2 className="dashboard-section-title">
                  Choose your first vault
                </h2>
                <p className="dashboard-section-subtitle">
                  Start with a structure that already matches what students
                  need most.
                </p>
              </div>
            </div>

            <div className="dashboard-vault-grid">
              {STARTER_VAULTS.map((vault) => (
                <button
                  key={vault.id}
                  type="button"
                  onClick={() => chooseVault(vault)}
                  className="vault-dashboard-card onboarding-choice-card"
                >
                  <div className="vault-dashboard-card-top">
                    <span className="dashboard-status-pill public">
                      {vault.label}
                    </span>
                    <h2>{vault.title}</h2>
                    <p>{vault.description}</p>

                    <div className="dashboard-tag-list">
                      {vault.tags.map((tag) => (
                        <span key={tag} className="dashboard-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="vault-dashboard-card-bottom">
                    <span>{vault.category}</span>
                    <span>Start with this vault →</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="dashboard-section">
            <div className="dashboard-section-header">
              <div>
                <h2 className="dashboard-section-title">
                  Add a few things you already have
                </h2>
                <p className="dashboard-section-subtitle">
                  Paste links, notes, tools, videos, articles, or anything you
                  do not want to lose.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="dashboard-secondary-button"
              >
                Change vault
              </button>
            </div>

            <section className="dashboard-card">
              <div className="onboarding-selected-vault">
                <span className="dashboard-status-pill public">
                  {selectedVault.category}
                </span>
                <h2>{selectedVault.title}</h2>
                <p>{selectedVault.description}</p>
              </div>

              <div className="onboarding-entry-stack">
                {entries.map((entry, index) => (
                  <div key={index} className="onboarding-entry-card">
                    <div className="vault-badge-small">Item {index + 1}</div>

                    <div className="vault-field">
                      <label className="vault-label">Title</label>
                      <input
                        value={entry.title}
                        onChange={(e) =>
                          updateEntry(index, "title", e.target.value)
                        }
                        className="vault-input"
                        placeholder="Example: Biology Midterm Study Guide"
                      />
                    </div>

                    <div className="vault-field">
                      <label className="vault-label">URL or note</label>
                      <input
                        value={entry.source}
                        onChange={(e) =>
                          updateEntry(index, "source", e.target.value)
                        }
                        className="vault-input"
                        placeholder="Paste a link or quick note here"
                      />
                    </div>

                    <div className="vault-field">
                      <label className="vault-label">Why this is useful</label>
                      <textarea
                        value={entry.usefulness}
                        onChange={(e) =>
                          updateEntry(index, "usefulness", e.target.value)
                        }
                        className="vault-textarea onboarding-mini-textarea"
                        placeholder="Example: Covers chapters 1–4"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="vault-actions">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="vault-button-secondary"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={createStarterVault}
                  disabled={isSaving}
                  className="vault-button-primary"
                >
                  {isSaving ? "Organizing..." : "Organize my vault"}
                </button>
              </div>
            </section>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="dashboard-section">
            <section className="dashboard-card onboarding-success-card">
              <p className="eyebrow">Your first vault is ready</p>
              <h2>Your information is already becoming useful.</h2>
              <p>
                You just turned scattered resources into a vault you can review,
                organize, and build on.
              </p>

              <div className="onboarding-before-after">
                <div className="onboarding-compare-card">
                  <span className="dashboard-status-pill">Before</span>
                  <ul>
                    <li>Random links</li>
                    <li>Notes everywhere</li>
                    <li>Hard to find later</li>
                  </ul>
                </div>

                <div className="onboarding-compare-card onboarding-compare-card-active">
                  <span className="dashboard-status-pill public">After</span>
                  <ul>
                    <li>Organized vault</li>
                    <li>Tagged resources</li>
                    <li>Ready to review</li>
                  </ul>
                </div>
              </div>

              <div className="dashboard-card-actions">
                {createdVaultId ? (
                  <Link
                    href={`/vaults/${createdVaultId}`}
                    className="dashboard-primary-button"
                  >
                    Go to my vault
                  </Link>
                ) : null}

                <Link href="/dashboard" className="dashboard-secondary-button">
                  Back to dashboard
                </Link>
              </div>
            </section>
          </section>
        ) : null}
      </main>
    </>
  );
}