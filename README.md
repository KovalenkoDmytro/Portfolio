# Dmytro Kovalenko — Portfolio

A business-focused Next.js 16 App Router portfolio with React 19, strict TypeScript, MUI 7 and Motion for React, introducing a Calgary-based web, mobile and ERP developer.

## Development

```sh
pnpm install
pnpm dev
```

Requires Node.js 22+ (needed by better-sqlite3; Node.js 22 LTS recommended). If pnpm is not installed, use `npx --yes pnpm@10` in its place. npm is also supported with a synchronized package lock.

## Validation

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`pnpm build` writes the production application to `.next/`. Run it with `pnpm start` (or `pnpm preview`). Deploy to a Next.js-compatible host or a Node.js server; uploading the old Vite `dist/` directory is no longer the deployment workflow. This portfolio needs no PHP backend. The only storage is the optional self-hosted analytics SQLite file (see Analytics).

## Deploy to the home server

From your local checkout, run `./scripts/deploy-portfolio.sh`. It connects using the SSH host `my-server-cf` (the host used by the `homeserver` shell alias), fast-forwards `master` in `~/apps/portfolio`, installs locked npm dependencies if they changed or are missing, builds, and restarts only the `portfolio` Supervisor program. SSH and sudo may prompt for credentials. Set `PORTFOLIO_SSH_HOST` to override the SSH host.

Commit and push changes first: the server deploys `origin/master`, not local uncommitted files. The script stops if tracked files on the server have changes, the branch is not `master`, the pull is not a fast-forward, or a command fails. Untracked files are left in place; Git stops the pull if one would be overwritten. A failed in-place Next.js build can affect the existing `.next` directory; check and rebuild before restarting the process if that happens.

## Rendering and SEO

- `src/app/page.tsx` and the main layout are Server Components. The homepage is statically prerendered at build time, so its text, headings, links and metadata are included in the initial HTML. Per-request rendering is unnecessary for the current static content.
- Animation and interaction modules have explicit client boundaries and hydrate after the server HTML loads. MUI's official App Router cache provider collects Emotion styles for server rendering.
- Motion defaults to paused during server rendering and initial hydration. Content is visible even without JavaScript; animations resume after hydration unless the visitor prefers reduced motion.
- `src/seo.ts` owns the title, description, canonical origin, Open Graph, Twitter metadata and ProfilePage/Person JSON-LD. The origin is currently `https://dmytro-kovalenko.ca`; update it if the public domain changes.
- `/robots.txt` and `/sitemap.xml` use the same origin. The sitemap lists the homepage and seven service pages; section anchors are not separate indexable pages.
- Seven service landing pages cover website development, web applications, mobile apps, custom ERP software, WordPress/WooCommerce/Shopify development, analytics/conversion tracking, and SEO/digital advertising in Calgary. Each is statically generated with its own title, description, canonical URL, Open Graph metadata, Service JSON-LD and internal links. Copy lives in `src/services.ts`.
- The homepage includes visible service information, business results with attribution, project work, an employer section, experience, a process section, FAQ and email contact links. FAQ disclosures work without JavaScript.
- Profile structured data describes the developer as a person in Calgary. No fabricated business address, ratings or customer testimonials are included.

Implementation references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [MUI App Router integration](https://mui.com/material-ui/integrations/nextjs/).

## Client logos

Client logos in `public/work/` are listed in `src/client-logos.ts` and displayed in the selected client work section. Update the file and card background there when adding a logo.

## Contact calls to action

Contextual calls to action follow services, selected projects and professional experience. The header and service pages also link to the homepage contact form. Homepage project CTAs select `Project enquiry`, while employer CTAs select `Hiring / opportunity`. The context changes only the enquiry type; it does not overwrite the visitor's message or contact details.

CTA links expose `data-cta` source labels and contextual buttons expose `data-enquiry` for future analytics configuration. These attributes do not install tracking or send analytics events by themselves. The layout uses inline CTAs rather than fixed overlays.

## Contact form and email setup

The homepage contact section uses a React Server Action and Gmail SMTP through `nodemailer`. The recipient defaults to the profile email in `src/content.ts`; visitors cannot choose it. The visitor's validated address is set as Reply-To, so a reply goes back to the person who submitted the form.

To enable real delivery:

1. Enable 2-Step Verification on the Google account and create an App Password at https://myaccount.google.com/apppasswords.
2. Copy `.env.example` to `.env.local`, or configure the variables in your hosting environment.
3. Set `GMAIL_USER` to the Gmail address and `GMAIL_APP_PASSWORD` to the App Password.
4. Optionally set `CONTACT_EMAIL_TO` to override the portfolio recipient.
5. Restart the local server or redeploy after changing settings.

These variables are server-only. `.env.local` and other environment files are ignored by Git; `.env.example` contains placeholders only. Do not use `NEXT_PUBLIC_` for mail credentials.

The form collects name, email, optional company, enquiry type and a message. It uses native field validation plus server-side length, type and email checks, a honeypot field, pending feedback and Next.js Server Action origin protection. Email content is sent as plain text. Errors preserve submitted values and provide a direct email fallback. Success is shown only after the provider acknowledges the request; provider acceptance does not confirm inbox delivery. Without mail configuration, the form returns an error and does not claim to have sent a message.

Mail tests mock the provider and do not send real email. Live delivery still needs verification after the Gmail account and App Password are configured.

## Wide-screen layout

The shared MUI container supports up to 1,440 pixels, with responsive gutters on the homepage and service pages. Services use two columns from the `md` breakpoint. Hero typography and the portrait scale up, while long-form paragraphs keep readable line lengths.

## Design and interaction

The palette uses graphite `#171C20`, white `#FFFFFF` and green `#D2FC86`. Muted text, borders and elevated surfaces are derived from these base colors. The hero features a personal portrait to introduce the developer alongside the existing content and MUI theme.

- The hero uses `public/developer.webp` through Next.js Image, with responsive image sizes, preloading and reserved dimensions. The portrait keeps its full aspect ratio on mobile and desktop.
- The opening section is server-rendered, with a portrait, business-focused introduction and results from professional experience. The background is static graphite to keep attention on the content.
- Motion for React handles scroll reveals, experience and project-panel transitions. The reduced-motion preference remains supported.
- Motion runs automatically and respects the system reduced-motion preference. Animation scopes are cleaned up on unmount.
- Existing project panels, links and contact information are preserved.

Stitch project: https://stitch.withgoogle.com/projects/16486726980484093004
Reference screenshot and HTML: `.stitch/designs/`. Exact palette, layout and motion rules: `.stitch/DESIGN.md`.
Generated sample metrics, contact details and experience claims were excluded from the implementation.

Published platform work includes [TrackFlow on the Shopify App Store](https://apps.shopify.com/trackflow-1) and [Kovalenko Admin Change Audit on WordPress.org](https://en-ca.wordpress.org/plugins/kovalenko-admin-change-audit/). Descriptions follow the public listings; no live installation counts or ratings are hardcoded.

## Editing

- Profile and experience: `src/content.ts`
- Routes and metadata: `src/app/` and `src/seo.ts`
- Server-rendered layout: `src/App.tsx`
- Theme and SSR styles: `src/app/providers.tsx`
- Client motion context: `src/PortfolioShell.tsx`
- Hero layout: `src/KineticHero.tsx`
- Services, process and FAQ sections: `src/BusinessSections.tsx`
- Service and FAQ copy: `src/services.ts`
- Header and footer: `src/SiteNavigation.tsx`
- Contact form: `src/ContactForm.tsx`
- Contact validation: `src/contact.ts`
- Server Action and mail transport: `src/app/contact-actions.ts` and `src/contact-email.ts`
- Service route template: `src/app/services/[slug]/page.tsx`
- Hero portrait: `public/developer.webp`
- Client logos: `public/work/`, `src/client-logos.ts` and `src/ClientLogos.tsx`
- Motion reveals: `src/components.tsx`
- Project panels: `src/ProjectVisuals.tsx`
- Published Shopify app and WordPress plugin: `src/PublishedProjects.tsx`
- Base colors: `src/colors.ts`
- Theme and typography: `src/theme.ts`

The portfolio preserves the existing profile, experience, and project descriptions. The colored project panels are interactive workflow diagrams, not product screenshots.

Library references: [Anime.js React integration](https://animejs.com/documentation/getting-started/using-with-react/) and [Motion for React](https://motion.dev/docs/react).

## Verification

Run lint, TypeScript, server-rendered navigation/accessibility and SEO tests, and the Next.js production build with the commands above. SEO tests cover visible HTML before hydration, JSON-LD and consistent canonical/sitemap/robots URLs. Service tests cover all seven rendered pages, metadata and unknown-route handling.

The generated `.next/dev/types/validator.ts` is excluded because Next.js 16.4.2 emits unused imports there that conflict with `noUnusedLocals`. Source files remain strict, and the production route validator in `.next/types/` remains included. Browser visual QA requires a connected browser; when unavailable, responsive layouts are reviewed in source and routes are checked over HTTP.

## Analytics

Self-hosted, privacy-friendly visit analytics. No third-party scripts and no client JavaScript: `src/proxy.ts` records a `pageview` row in SQLite for real page navigations (GET, `Accept: text/html`, not a bot, not a prefetch/RSC request). Assets, `/api`, `/admin`, robots/sitemap/icons are never recorded. Code lives in `src/analytics/`; the dashboard is `/admin/analytics?days=7|30|90`.

Environment variables (put them in `~/apps/portfolio/.env.local`, `chmod 600`, and restart with `supervisorctl restart portfolio`; prefer this over the Supervisor `environment=` line so the password is not visible in process config):

- `ANALYTICS_DB_PATH` - SQLite file, default `./data/analytics.db` (gitignored; WAL mode, file mode 600, directory mode 700). A relative path resolves against the process working directory (the app directory under Supervisor), and that directory must be writable by the app user. The size is capped at about 1 GB; past that, inserts fail and are logged. Back the file up with `sqlite3 data/analytics.db ".backup backup.db"` (not a plain copy while it is running).
- `ADMIN_USER` / `ADMIN_PASSWORD` - HTTP Basic credentials for `/admin/analytics`. The password must be at least 16 characters; if either variable is unset or the password is shorter, the dashboard is inaccessible. Failed attempts are logged (rate-limited, never with credentials). Authorized responses are `no-store, private` and `noindex`.

Cloudflare setup:

- Enable the managed transform "Add visitor location headers" (Rules > Transform Rules > Managed Transforms) so `cf-ipcountry`, `cf-ipcity`, `cf-region` and `cf-region-code` reach the app. Missing values are stored as `Unknown`. A visit with no `cf-connecting-ip` is counted but gets no unique-visitor hash (the dashboard notes how many).
- Do not cache HTML (keep "Cache Everything" off for page routes), otherwise cached responses never reach the server and are not counted.
- The `cf-*` headers are trusted as-is, which is only safe if the origin is reachable exclusively through Cloudflare/the tunnel (the app listens on `127.0.0.1`; do not expose the port otherwise).
- Recommended: add a Cloudflare rate-limiting rule on `/admin*`, or put the path behind Cloudflare Access as a stronger alternative to Basic auth.

Only the homepage and the service pages keep their path; any other URL is stored as `(other)`. Track the resume with a link such as `https://dmytro-kovalenko.ca/?utm_source=resume`; the dashboard highlights `utm_source=resume`.

Privacy: raw IP addresses and user agents are never stored. A visitor is `sha256(daily_salt + ip + user_agent)` with a random salt per UTC day, so "unique visitors" counts a returning visitor once per UTC day, and visitors cannot be linked across days. Only the current day's salt is kept (in memory and in the `salts` table; older salts are deleted on rollover), and `secure_delete` is on. Events (with the day-scoped hashes) are deleted after 1 year, checked once a day. Times are stored in UTC and displayed in America/Edmonton.
