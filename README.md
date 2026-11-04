# digindominic.me

Personal site of **Digin Dominic**, Software Engineer at the University of Edinburgh (Genes to Cognition Programme). It collects case studies of research software, publications, and technical writing.

**Live site:** [digindominic.me](https://digindominic.me)

Built with Next.js 15 (App Router) as a fully static export, styled with Tailwind CSS, and deployed to GitHub Pages. All page content lives in Markdown files, so most updates mean editing a file in `content/` and pushing to `main`.

---

## Quick start

Requires Node.js 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

The site runs at <http://localhost:3000> and reloads as you edit code or content.

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Regenerates the sitemap, then builds the static site into `out/` |
| `npm run images` | Generates responsive WebP variants from content images |
| `npm run sitemap` | Regenerates `public/sitemap.xml` on its own |
| `npm run lint` | Runs Next.js linting |
| `npm run check:seo` | Audits the built `out/` site (requires Python 3.9+) |

To preview a production build locally, serve the `out/` folder with any static file server, for example `npx serve out`.

---

## Updating content

Each Markdown file has a YAML front-matter block for its metadata, followed by the body in Markdown. Raw HTML is allowed in the body, for example `<video>` embeds. The file name becomes the URL slug.

### Projects (`content/projects/*.md`, served at `/projects/<file-name>/`)

```yaml
---
title: "Grant Lab Research Platform"
date: "2024-06-01"            # YYYY-MM-DD; sets sort order (newest first)
category: "research"          # research | commercial | personal | education
summary: "One or two sentences shown on cards and the case study."
image: "/images/example.png"  # optional; leave "" for a stack-based placeholder
tag: "Flask, Docker Swarm, Python"   # comma-separated; also drives the tech filter
role: "Lead Developer"
duration: "2+ years (ongoing)"
featured: true                # optional; shows on the home page and top of Work
featuredOrder: 1              # optional; order among featured projects
problem: "…"                  # optional framing cards at the top of the case study
scope: "…"
outcome: "…"
highlights:                   # optional bullet list shown above the body
  - "…"
demo: "https://…"             # optional live link
github: "https://…"           # optional source link
visibilityNote: "…"           # optional note for internal or institutional work
---
```

Every `##` heading in the body becomes an entry in the case study's "On this page" outline.

### Writing (`content/blog/*.md`, served at `/blog/<file-name>/`)

```yaml
---
title: "Post title"
date: "2024-01-15"
summary: "Shown in the post list and link previews."
image: "/images/example.png"  # optional
tag: "Ansible, DevOps"
---
```

### Publications (`content/publications/<role>/*.md`)

The folder sets the authorship role:

- `main-author/`: first or co-first author (shows a "First author" or "Co-first author" badge)
- `co-author/`: other authorship
- `preprint/`: preprints (papers not yet peer-reviewed)

```yaml
---
title: "Paper title"
date: "2025-12-02"
authors: "Sorokina O*, Dominic D*, Grant SGN"
journal: "Scientific Reports"
year: "2025"
volume: "15"        # optional
issue: "1"          # optional
pages: "42986"      # optional
doi: "https://doi.org/…"
pdf: "https://…"    # optional
pubmed: "https://…" # optional
status: "published" # published | preprint
equalContribution: true   # optional
---
Abstract text goes here.
```

All papers appear on `/publications/` in one list, newest first. The home page features the first peer-reviewed, lead-author paper.

### Other content

| File | Used by |
|---|---|
| `content/hero/hero.md` | Home page introduction |
| `content/about/about.md` | About page (body) and contact details on the About and Contact pages |

`content/archive/` and `content/toolkit/` are kept for reference but aren't rendered by any page.

### Search titles and descriptions

Projects and articles support optional `seoTitle` and `seoDescription` front-matter fields. These control search metadata and social previews while keeping `title`, `summary`, page headings, and body content intact.

```yaml
seoTitle: "Cortex: AI Memory & Agent Management"
seoDescription: "Open-source memory and agent management for AI coding, with hybrid search, ChromaDB, Claude Code hooks, MCP tools, reminders and persistent plans."
```

After building, run `npm run check:seo`. It checks the emitted pages, including unique metadata, canonical URLs, social image files, JSON-LD, sitemap coverage, and 404 exclusion. The audit uses editorial budgets of 65 characters for full titles (including ` | Digin Dominic`) and 170 for descriptions. Search engines use their own display rules; these budgets help keep copy concise.

Search Console indexing and real-user Core Web Vitals require access to the live site's Google property and are separate from these build checks.

### Images and video

Put original files in `public/images/` or `public/videos/` and reference them with a leading slash, for example `/images/my-screenshot.png`.

`npm run dev` and `npm run build` generate responsive WebP variants for content images. The shared `PortfolioImage` component selects the appropriate size and includes intrinsic dimensions. Generated files live in the ignored `public/images/generated/` directory, with an ignored lookup at `lib/generated-images.json`; keep the original image paths in Markdown. This uses the Sharp dependency supplied by Next.js.

- **Images:** keep them about 1600px wide or less. WebP or JPEG is usually far smaller than PNG.
- **Videos:** use `preload="none"` and a `poster` image so they don't download until a visitor presses play.
- **Link-preview image:** `public/images/og-image.png` (1200×630) is used for pages without their own image.

---

## Deployment

Pushing to `main` deploys automatically. The [Deploy to GitHub Pages](.github/workflows/deploy.yml) workflow:

1. installs dependencies with `npm ci`
2. runs `npm run build`
3. publishes `out/` to the `gh-pages` branch with the `digindominic.me` custom domain

The live site updates about a minute after the push. You can follow each run in the repository's **Actions** tab.

The workflow checks out the full git history so the sitemap can use real "last modified" dates.

`npm run deploy` can still publish from your own machine with `gh-pages`, but the workflow is the normal route.

---

## Project structure

```
app/                  Routes (App Router). Each folder is a page.
  layout.jsx          Site-wide <head>, metadata, header, footer, cookie banner
  page.jsx            Home page
  projects/           Work list and case study pages
  blog/               Writing list and post pages
  publications/       Publications list
  about/ contact/ privacy/
  not-found.jsx       404 page
  globals.css         Design tokens (colour variables) and shared component classes
components/
  layout/             Header, Footer, PrevNextNav, CookieConsent
  sections/           Home page sections (Hero, ImpactShowcase, Timeline, …)
  projects/           Case study layout (ReadModeView)
  common/             Small shared pieces (SocialLinks, StackPlaceholder)
lib/
  content.js          Reads and parses Markdown from content/
  format.js           Date and tag helpers
  site.js             Site URL, social links, page metadata helper
content/              All page content as Markdown (see above)
public/               Static files served as-is (images, videos, resume PDF, robots.txt)
scripts/
  generate-sitemap.js Builds public/sitemap.xml (runs before every build)
  generate-resume.py  Builds public/Digin_Dominic_Resume.pdf (needs Python + reportlab)
```

---

## Design and accessibility

- **Layouts:** Work has a searchable catalogue with technology filters; publications have expandable abstracts; case studies and essays have reading guides. About, Contact, Privacy, and the 404 page share the editorial visual language. Mastheads and reading layouts live in `components/editorial/`, with inner-page styles in `app/editorial-pages.css`.
- **Themes:** the editorial design uses warm cream, forest green, and serif headings. Light is the default. A toggle in the header switches between light and dark, and the choice is remembered.
- **Colours:** accent colours are CSS variables in `app/globals.css`, with separate light and dark values that meet WCAG AA contrast. Use the Tailwind names (`text-neural-blue`, `bg-signal-green/15`, …) rather than hard-coded hex values so both themes stay correct.
- **Shared classes:** `.eyebrow`, `.meta-label`, `.editorial-card`, `.proof-chip`, `.btn-primary`, `.btn-secondary`, `.tag` and `.case-study-prose`. Page titles use the `text-page-title` size and the home headline uses `text-hero`.
- **Motion:** animations respect the visitor's "reduce motion" setting.
- **Checking pages:** the pages pass an axe-core accessibility check in both themes. Recheck new pages, especially for colour contrast and heading order.

---

## Privacy and analytics

Google Analytics loads **only after** a visitor clicks **Accept** on the cookie banner. Reject, or no choice, means no analytics script and no analytics cookies. Visitors can change their choice from **Cookie settings** in the footer. The details are explained on [/privacy/](https://digindominic.me/privacy/).

The measurement ID is set in `components/layout/CookieConsent.jsx`.

The contact form posts to Formspree; its endpoint is in `app/contact/ContactClient.jsx`.

---

## Licence

© Digin Dominic. All rights reserved. The code and content are published for reference. Please ask before reusing them.
