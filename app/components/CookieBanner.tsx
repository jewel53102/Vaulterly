"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "vaulterly_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  function setConsent(value: "all" | "essential") {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent("vaulterly_consent_updated"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-slate-600">
            We use a session cookie to keep you signed in and anonymous analytics
            to understand how the site is used. No advertising cookies.{" "}
            <Link href="/privacy" className="font-medium text-[#4a7a9b] hover:underline">
              Privacy Policy
            </Link>
          </p>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setConsent("essential")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => setConsent("all")}
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
