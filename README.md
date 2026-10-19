# VibeShare — Free Subdomain Starter (demo)

This is a static prototype, not a production subdomain-hosting platform. It runs on a free temporary `*.pages.dev` address. It supports local demo profiles, a website-upload preview (HTML only, stored in the browser), and an admin-style dashboard mockup.

## Important limitations
- No real account authentication, server database, file hosting, DNS provisioning, or real subdomains are created.
- Demo data is stored in the browser's localStorage and is not shared between devices/users.
- Do not upload sensitive information. Do not use this as production auth.
- To issue `username.yourdomain.com`, you need a domain you control, wildcard DNS, routing/hosting for each tenant, abuse handling, and ongoing maintenance. A free `pages.dev` project URL cannot be used as a wildcard subdomain domain you own.

## Deploy free to Cloudflare Pages
1. Create a GitHub account and a new public repository (e.g. `vibeshare-free-subdomain`).
2. Upload `index.html`, `styles.css`, and `app.js` to the repository root.
3. In Cloudflare Dashboard, open Workers & Pages → Create → Pages → Connect to Git.
4. Choose the repository. Framework preset: None. Build command: leave blank. Build output directory: `/` or `.` depending on the UI.
5. Deploy. Cloudflare gives you a temporary address like `project-name.pages.dev`.
6. To update, commit changes to GitHub and Cloudflare Pages redeploys.

Cloudflare Pages current limits vary; check official docs: https://developers.cloudflare.com/pages/platform/limits/

## Before real public launch
Use a backend (e.g. Cloudflare Workers + D1/R2, or another provider), real auth, upload validation/scanning, rate limits, takedown/abuse policy, backups, and a clear privacy policy. Never promise permanent lifetime service; say “free while the service remains available.”
