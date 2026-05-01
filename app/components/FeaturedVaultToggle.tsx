"use client";

import { useState } from "react";

export default function FeaturedVaultToggle({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(true);

  return (
    <div>
      {/* Toggle Button */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShow((prev) => !prev)}
          className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
        >
          {show ? "Hide Featured Vault" : "Show Featured Vault"}
        </button>
      </div>

      {/* Featured Content */}
      {show && children}
    </div>
  );
}