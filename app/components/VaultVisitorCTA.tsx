"use client";

import Link from "next/link";

type Props = {
  vaultId: string;
  isLoggedIn: boolean;
  duplicateAction?: (formData: FormData) => Promise<void>;
};

export default function VaultVisitorCTA({ vaultId, isLoggedIn, duplicateAction }: Props) {
  function trackSignupClick() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag?.("event", "vault_visitor_signup_click", { vault_id: vaultId });
  }

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#d8e8f5] bg-[#ebf2f8] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-[#2c5f7a]">
              Save this vault to your account
            </p>
            <p className="mt-0.5 text-sm text-[#4a7a9b]">
              {isLoggedIn
                ? "Copy it to your vaults and use it as AI context for your own essays."
                : "Sign up free to save a copy and drop it into ChatGPT or Claude when you write."}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            {isLoggedIn ? (
              <form action={duplicateAction}>
                <input type="hidden" name="vaultId" value={vaultId} />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-[#779EBF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5a87ac]"
                >
                  Save a copy
                </button>
              </form>
            ) : (
              <>
                <Link
                  href={`/signup?next=/vaults/${vaultId}`}
                  onClick={trackSignupClick}
                  className="inline-flex items-center justify-center rounded-xl bg-[#779EBF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5a87ac]"
                >
                  Sign up free
                </Link>
                <Link
                  href={`/login?next=/vaults/${vaultId}`}
                  className="inline-flex items-center justify-center rounded-xl border border-[#b8d4e8] bg-white px-4 py-2.5 text-sm font-semibold text-[#4a7a9b] shadow-sm transition hover:bg-[#ebf2f8]"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
