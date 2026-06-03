# Shree Singhal — Personal Portfolio

Single-page personal portfolio. Next.js (App Router) + TypeScript + Tailwind v3. Static export, deploys to GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build the static export

```bash
npm run build
```

This writes the site to `./out/`. Anything in `./public/` is copied into the export verbatim (including `.nojekyll`).

## Where to edit content

All editable copy lives in [`content/`](./content):

| File                       | What it controls                                            |
| -------------------------- | ----------------------------------------------------------- |
| `content/site.ts`          | Name, tagline, contact email, social URLs, bio paragraphs, meta tags |
| `content/projects.ts`      | Project cards in the Projects section                        |
| `content/experience.ts`    | Experience entries                                           |
| `content/skills.ts`        | Skills grouped by category                                   |

Each file has a `// TODO: replace ...` comment marking the placeholder content.

## Open TODOs (real content to fill in)

- Real bio paragraphs (`content/site.ts` → `bio`)
- Real project entries with Code / Live URLs (`content/projects.ts`); screenshots can be dropped into each card's image well later
- Real experience entries (`content/experience.ts`); optional company logos for the reserved logo slot
- Real skill names per group (`content/skills.ts`) — see `CLAUDE_CODE_PROMPT.md` for suggested defaults
- GitHub URL (`content/site.ts` → `socials.github`)
- LinkedIn URL (`content/site.ts` → `socials.linkedin`)
- Optional portrait photos for the reserved photo slots in `components/Home.tsx` and `components/About.tsx`
- **`basePath`** in `next.config.js` — see below

### Resume button

The Resume button is intentionally not rendered. To re-enable:

1. Drop a `resume.pdf` into `public/`.
2. In `components/About.tsx`, uncomment the commented `<a href="/resume.pdf" download …>` block (it's inside the bio column with a clearly marked comment).

## `basePath` for GitHub Pages

`next.config.js` ships with `basePath` and `assetPrefix` commented out. The choice depends on the type of GitHub Pages site you deploy to:

- **User page** at `https://<username>.github.io/` (repo must be named `<username>.github.io`): leave both commented out.
- **Project page** at `https://<username>.github.io/<repo-name>/` (any other repo name): uncomment and set both to `/<repo-name>` and `/<repo-name>/`.

## Deploy

A GitHub Actions workflow at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) builds on every push to `main` and deploys `./out/` to GitHub Pages via the official `actions/deploy-pages` flow.

First-time setup:

1. Push this directory to a GitHub repo.
2. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually under **Actions**).

## Stack

- Next.js 14 (App Router, `output: 'export'`)
- React 18
- TypeScript 5 (`strict: true`)
- Tailwind CSS 3
- `next/font/google` for self-hosted Spectral (serif) + Inter (sans)

## Notes

- Light mode only — no theme toggle.
- Motion is intentionally fixed for all visitors (`prefers-reduced-motion` is not honored, by design).
