import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const title = searchParams.get("title") || "Vaulterly";
  const description =
    searchParams.get("description") ||
    "Free research organiser for students.";

  const displayTitle =
    title.length > 55 ? title.slice(0, 52) + "..." : title;
  const displayDesc =
    description.length > 120 ? description.slice(0, 117) + "..." : description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            backgroundColor: "#779EBF",
          }}
        />

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "#ebf2f8",
              border: "2px solid #779EBF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            ◎
          </div>
          <span
            style={{
              fontSize: "22px",
              fontWeight: "800",
              color: "#553F28",
              letterSpacing: "-0.03em",
            }}
          >
            Vaulterly
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "800",
              color: "#0f172a",
              lineHeight: "1.05",
              letterSpacing: "-0.04em",
            }}
          >
            {displayTitle}
          </div>

          {displayDesc && (
            <div
              style={{
                fontSize: "26px",
                color: "#64748b",
                lineHeight: "1.45",
                fontWeight: "400",
                maxWidth: "900px",
              }}
            >
              {displayDesc}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "20px", color: "#94a3b8", fontWeight: "600" }}>
            myvaulterly.com
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ebf2f8",
              borderRadius: "999px",
              padding: "10px 20px",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "18px", color: "#4a7a9b", fontWeight: "700" }}>
              Free Student Research Vault
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
