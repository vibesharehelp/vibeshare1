const $ = (s) => document.querySelector(s);
const STORAGE_KEY = "vibeshare_demo_profiles_v1";
const form = $("#profile-form");
const list = $("#profile-list");
const message = $("#form-message");
const usernameInput = $("#username");
const heroUrl = $("#hero-url");

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function readProfiles() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveProfiles(items) { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function renderProfiles() {
  const items = readProfiles();
  if (!items.length) {
    list.innerHTML = '<div class="empty">No profiles yet. Create one above.</div>';
    return;
  }
  list.innerHTML = items.map((p, i) => `
    <article class="profile-card">
      <div><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.username)}.vibeshare.example · ${escapeHTML(p.bio || "No bio added")}</p></div>
      <button class="secondary" data-delete="${i}" type="button">Delete</button>
    </article>`).join("");
}
usernameInput.addEventListener("input", () => {
  const name = slugify(usernameInput.value) || "yourname";
  heroUrl.textContent = `${name}.vibeshare.example`;
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = slugify(usernameInput.value);
  const name = $("#display-name").value.trim();
  const bio = $("#bio").value.trim();
  const link = $("#links").value.trim();
  if (username.length < 3) { message.textContent = "Username kam se kam 3 characters ka hona chahiye."; return; }
  const items = readProfiles();
  if (items.some((p) => p.username === username)) { message.textContent = "Ye demo username pehle se bana hua hai."; return; }
  items.unshift({ username, name, bio, link, createdAt: new Date().toISOString() });
  saveProfiles(items);
  renderProfiles();
  message.textContent = "Demo profile ban gaya! Ye sirf isi browser mein save hua hai; live subdomain nahi bana.";
  form.reset();
  heroUrl.textContent = "yourname.vibeshare.example";
});
list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  const items = readProfiles();
  items.splice(Number(button.dataset.delete), 1);
  saveProfiles(items);
  renderProfiles();
});
$("#clear-data").addEventListener("click", () => {
  if (confirm("Is browser se saare VibeShare demo profiles delete kar dein?")) {
    localStorage.removeItem(STORAGE_KEY);
    renderProfiles();
    message.textContent = "Local demo data clear kar diya gaya.";
  }
});
$("#preview-file").addEventListener("click", async () => {
  const file = $("#html-file").files[0];
  const output = $("#preview-message");
  const frame = $("#html-preview");
  if (!file) { output.textContent = "Pehle ek HTML file choose karo."; return; }
  if (!file.name.toLowerCase().endsWith(".html") || file.size > 1024 * 1024) {
    output.textContent = "Sirf .html file (maximum 1 MB) select karo."; return;
  }
  const html = await file.text();
  // Sandbox iframe prevents scripts and same-origin access in this local-only preview.
  frame.srcdoc = html;
  frame.hidden = false;
  output.textContent = "Local preview khul gaya. File server par upload nahi hui aur public URL nahi bana.";
});
$("#html-file").addEventListener("change", () => {
  $("#file-name").textContent = $("#html-file").files[0]?.name || "No file selected";
});
renderProfiles();
