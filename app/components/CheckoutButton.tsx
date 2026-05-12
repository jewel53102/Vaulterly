"use client";

import { useState } from "react";

type Props = {
  priceKey: "pro_monthly" | "pro_annual" | "founding";
  label: string;
  className: string;
};

export default function CheckoutButton({ priceKey, label, className }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceKey }),
      });

      const data = await res.json();

      if (res.status === 401) {
        window.location.href = "/signup?next=/pricing";
        return;
      }

      if (!res.ok || !data.url) {
        alert(data.error ?? "Could not start checkout. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Could not start checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? "Redirecting..." : label}
    </button>
  );
}
