type SpamCheckInput = {
  vaultName: string;
  vaultDescription?: string | null;
  entryUrls: string[];
  entryTitles: string[];
};

const SHORTENER_HOSTS = new Set([
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "goo.gl",
  "ow.ly",
  "buff.ly",
  "is.gd",
  "rebrand.ly",
]);

const SUSPICIOUS_KEYWORDS = [
  "free money",
  "crypto giveaway",
  "airdrop",
  "casino",
  "bet now",
  "work from home guaranteed",
  "click here",
  "buy now",
  "limited offer",
  "affiliate",
];

function safeUrlHost(raw: string): string | null {
  try {
    return new URL(raw).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

export function scoreVaultForSpam(input: SpamCheckInput) {
  let score = 0;
  const reasons: string[] = [];

  const combinedText = [
    input.vaultName,
    input.vaultDescription ?? "",
    ...input.entryTitles,
  ]
    .join(" ")
    .toLowerCase();

  for (const keyword of SUSPICIOUS_KEYWORDS) {
    if (combinedText.includes(keyword)) {
      score += 2;
      reasons.push(`Contains suspicious phrase: ${keyword}`);
    }
  }

  const hosts = input.entryUrls
    .map(safeUrlHost)
    .filter((v): v is string => Boolean(v));

  const uniqueHosts = new Set(hosts);

  if (input.entryUrls.length >= 20) {
    score += 2;
    reasons.push("Large number of links in one vault");
  }

  if (hosts.some((h) => SHORTENER_HOSTS.has(h))) {
    score += 2;
    reasons.push("Contains URL shorteners");
  }

  if (hosts.length > 0 && uniqueHosts.size <= Math.max(1, Math.floor(hosts.length / 5))) {
    score += 2;
    reasons.push("Very low domain diversity");
  }

  const duplicateTitleCount =
    input.entryTitles.length - new Set(input.entryTitles.map((t) => t.trim().toLowerCase())).size;

  if (duplicateTitleCount >= 3) {
    score += 2;
    reasons.push("Repeated entry titles");
  }

  if ((input.vaultDescription ?? "").length > 1200) {
    score += 1;
    reasons.push("Very long description");
  }

  return { score, reasons };
}

export function floorWindowStart(date: Date, minutes: number) {
  const ms = minutes * 60 * 1000;
  return new Date(Math.floor(date.getTime() / ms) * ms).toISOString();
}