import { NextResponse } from "next/server";

function normalizeUrl(input: string) {
  const trimmed = input.trim();

  if (!trimmed) return null;

  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  try {
    return new URL(withProtocol).toString();
  } catch {
    return null;
  }
}

function extractMeta(html: string, property: string) {
  const regex = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i"
  );

  const match = html.match(regex);
  return match?.[1]?.trim() || "";
}

function extractTitle(html: string) {
  const ogTitle = extractMeta(html, "og:title");
  const twitterTitle = extractMeta(html, "twitter:title");

  if (ogTitle) return ogTitle;
  if (twitterTitle) return twitterTitle;

  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  return titleMatch?.[1]?.replace(/\s+/g, " ").trim() || "";
}

function extractDescription(html: string) {
  return (
    extractMeta(html, "og:description") ||
    extractMeta(html, "twitter:description") ||
    extractMeta(html, "description")
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const normalizedUrl = normalizeUrl(body?.url || "");

    if (!normalizedUrl) {
      return NextResponse.json(
        { error: "Please enter a valid URL." },
        { status: 400 }
      );
    }

    const response = await fetch(normalizedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 VaulterlyBot/1.0 (+https://myvaulterly.com/bot)",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not fetch this URL." },
        { status: 400 }
      );
    }

    const html = await response.text();

    const title = extractTitle(html);
    const description = extractDescription(html);

    return NextResponse.json({
      url: normalizedUrl,
      title: title || normalizedUrl,
      description: description || "",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch link details." },
      { status: 500 }
    );
  }
}