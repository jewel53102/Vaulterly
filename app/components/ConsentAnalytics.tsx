"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

export default function ConsentAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    function checkConsent() {
      setConsented(localStorage.getItem("vaulterly_consent") === "all");
    }

    checkConsent();
    window.addEventListener("vaulterly_consent_updated", checkConsent);
    return () =>
      window.removeEventListener("vaulterly_consent_updated", checkConsent);
  }, []);

  if (!consented) return null;
  return <Analytics />;
}
