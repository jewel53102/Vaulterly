"use strict";

// ── CONFIG ────────────────────────────────────────────────────
const SUPABASE_URL = "https://waujrrykwyodjqnhxzbl.supabase.co";
const SUPABASE_KEY = "sb_publishable_khQhe7hCE3wooDE00U4PXA_7CAw4K6e";
const STORAGE_KEY  = "vaulterly_session";
const SITE_URL     = "https://myvaulterly.com";

// ── SUPABASE API ──────────────────────────────────────────────
function authHeaders(accessToken) {
  return {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${accessToken || SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };
}

async function sbSignIn(email, password) {
  const res = await fetch(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || "Sign in failed");
  return data;
}

async function sbRefresh(refreshToken) {
  const res = await fetch(
    `${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error("Session expired — please sign in again");
  return data;
}

async function sbGetVaults(accessToken, userId) {
  const params = new URLSearchParams({
    user_id: `eq.${userId}`,
    select: "id,name,title",
    order: "created_at.desc",
  });
  const res = await fetch(`${SUPABASE_URL}/rest/v1/vaults?${params}`, {
    headers: authHeaders(accessToken),
  });
  if (!res.ok) throw new Error("Failed to load vaults");
  return res.json();
}

async function sbSaveEntry(accessToken, { userId, vaultId, title, url, description }) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/entries`, {
    method: "POST",
    headers: { ...authHeaders(accessToken), "Prefer": "return=representation" },
    body: JSON.stringify({
      user_id: userId,
      vault_id: vaultId,
      title: title || url,
      url,
      description: description || null,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || "Failed to save");
  return Array.isArray(data) ? data[0] : data;
}

// ── SESSION STORAGE ───────────────────────────────────────────
async function getSession() {
  return new Promise((resolve) => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      resolve(result[STORAGE_KEY] || null);
    });
  });
}

async function saveSession(session) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: session }, resolve);
  });
}

async function clearSession() {
  return new Promise((resolve) => {
    chrome.storage.local.remove(STORAGE_KEY, resolve);
  });
}

// Returns a valid access token, refreshing if needed.
async function getValidToken() {
  const session = await getSession();
  if (!session) return null;

  const fiveMin = 5 * 60 * 1000;
  const isExpiringSoon = session.expires_at - Date.now() < fiveMin;

  if (isExpiringSoon) {
    try {
      const fresh = await sbRefresh(session.refresh_token);
      const updated = {
        ...session,
        access_token:  fresh.access_token,
        refresh_token: fresh.refresh_token || session.refresh_token,
        expires_at:    Date.now() + (fresh.expires_in || 3600) * 1000,
      };
      await saveSession(updated);
      return updated.access_token;
    } catch {
      await clearSession();
      return null;
    }
  }

  return session.access_token;
}

// ── VIEWS ─────────────────────────────────────────────────────
const views = ["login", "loading", "save", "success", "nourl"];

function showView(name) {
  views.forEach((v) => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.style.display = v === name ? "" : "none";
  });
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.display = "";
}

function hideError(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
}

function setLoading(btn, loading, text) {
  btn.disabled = loading;
  btn.textContent = loading ? "…" : text;
}

// ── CURRENT TAB ───────────────────────────────────────────────
async function getCurrentTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0] || null);
    });
  });
}

// ── POPULATE VAULT DROPDOWN ───────────────────────────────────
function populateVaults(vaults) {
  const select = document.getElementById("vault-select");
  select.innerHTML = "";

  if (!vaults.length) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No vaults yet — create one at myvaulterly.com";
    select.appendChild(opt);
    return;
  }

  vaults.forEach((vault) => {
    const opt = document.createElement("option");
    opt.value = vault.id;
    opt.textContent = vault.name || vault.title || "Untitled Vault";
    select.appendChild(opt);
  });
}

// ── INIT ──────────────────────────────────────────────────────
async function init() {
  showView("loading");

  const tab = await getCurrentTab();

  // Block on non-navigable pages (chrome://, extension pages, etc.)
  if (!tab || !tab.url || !tab.url.startsWith("http")) {
    showView("nourl");
    return;
  }

  const token = await getValidToken();
  if (!token) {
    showView("login");
    return;
  }

  const session = await getSession();
  document.getElementById("btn-signout").style.display = "";

  try {
    const vaults = await sbGetVaults(token, session.user_id);
    populateVaults(vaults);

    // Pre-fill title from the tab
    document.getElementById("entry-title").value = tab.title || "";
    document.getElementById("entry-url").textContent = tab.url;

    showView("save");
  } catch (err) {
    // Token might be invalid — clear and show login
    await clearSession();
    showView("login");
  }
}

// ── LOGIN ─────────────────────────────────────────────────────
document.getElementById("btn-login").addEventListener("click", async () => {
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const btn      = document.getElementById("btn-login");

  hideError("login-error");

  if (!email || !password) {
    showError("login-error", "Please enter your email and password.");
    return;
  }

  setLoading(btn, true, "Sign In");

  try {
    const data = await sbSignIn(email, password);

    await saveSession({
      access_token:  data.access_token,
      refresh_token: data.refresh_token,
      expires_at:    Date.now() + (data.expires_in || 3600) * 1000,
      user_id:       data.user.id,
      user_email:    data.user.email,
    });

    document.getElementById("btn-signout").style.display = "";

    const tab = await getCurrentTab();
    const vaults = await sbGetVaults(data.access_token, data.user.id);
    populateVaults(vaults);

    if (tab?.url?.startsWith("http")) {
      document.getElementById("entry-title").value = tab.title || "";
      document.getElementById("entry-url").textContent = tab.url;
      showView("save");
    } else {
      showView("nourl");
    }
  } catch (err) {
    showError("login-error", err.message || "Sign in failed. Check your credentials.");
  } finally {
    setLoading(btn, false, "Sign In");
  }
});

// Allow Enter key to submit login
["email", "password"].forEach((id) => {
  document.getElementById(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("btn-login").click();
  });
});

// ── SIGN OUT ──────────────────────────────────────────────────
document.getElementById("btn-signout").addEventListener("click", async () => {
  await clearSession();
  document.getElementById("btn-signout").style.display = "none";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  showView("login");
});

// ── SAVE ──────────────────────────────────────────────────────
document.getElementById("btn-save").addEventListener("click", async () => {
  const vaultId = document.getElementById("vault-select").value;
  const title   = document.getElementById("entry-title").value.trim();
  const url     = document.getElementById("entry-url").textContent.trim();
  const note    = document.getElementById("entry-note").value.trim();
  const btn     = document.getElementById("btn-save");

  hideError("save-error");

  if (!vaultId) {
    showError("save-error", "Please select a vault.");
    return;
  }

  setLoading(btn, true, "Save to Vault");

  try {
    const token   = await getValidToken();
    const session = await getSession();

    if (!token) {
      await clearSession();
      showView("login");
      return;
    }

    await sbSaveEntry(token, {
      userId:      session.user_id,
      vaultId,
      title,
      url,
      description: note,
    });

    // Show success
    const vaultName = document.getElementById("vault-select").selectedOptions[0]?.textContent || "your vault";
    document.getElementById("success-detail").textContent =
      `"${title || url}" was added to "${vaultName}"`;
    document.getElementById("link-vault").href = `${SITE_URL}/vaults/${vaultId}`;
    showView("success");
  } catch (err) {
    showError("save-error", err.message || "Something went wrong. Please try again.");
  } finally {
    setLoading(btn, false, "Save to Vault");
  }
});

// ── SAVE ANOTHER ──────────────────────────────────────────────
document.getElementById("btn-save-another").addEventListener("click", () => {
  document.getElementById("entry-note").value = "";
  hideError("save-error");
  showView("save");
});

// ── START ─────────────────────────────────────────────────────
init();
