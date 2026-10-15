# 1990 Honda CR125R — Classic Restoration

Source for [1990cr125revival.com](https://www.1990cr125revival.com/) — a single-page site
documenting the revival of a 1990 Honda CR125R that sat in a shop for 32 years before coming
home in July 2025.

The bike made its public debut at the 125 Dream Race Show and Shine at Washougal MX.

## Tech stack

- **React 19** + **TypeScript**, bundled with **Vite 8**
- **MUI 7** for all UI, with a dark theme (`#111` background, Honda red `#cc0000` primary)
- **yet-another-react-lightbox** for full-screen photo viewing
- ESLint 9 (flat config) with `typescript-eslint` and the React Hooks / Refresh plugins

No router, no state library, no backend — the whole site is one client-rendered page with a
tab switcher, deployed as static files.

## Running it

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # type-check, build, then pre-render one HTML page per tab into dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
```

`npm run build` runs `tsc -b` first, so a type error fails the build.

## How the site is put together

`src/App.tsx` holds a single piece of state — the active tab — and renders `NavBar` and `Hero`
persistently above whichever section is selected. Tabs are defined once in `src/tabs.ts`:
`TAB_IDS`, nav labels, URL slugs, and each page's search title and description (`TAB_META`).
Adding a tab means adding it there, a branch in `App.tsx`, and a line in `public/sitemap.xml`.

| Tab | URL | Component | Notes |
| --- | --- | --- | --- |
| My Story | `/` | `MyStory.tsx` | Home page — the personal writeup |
| As Found | `/as-found` | `Gallery.tsx` + `OriginalListing.tsx` | Gallery, then the Facebook Marketplace listing below it |
| Restoration | `/restoration` | `PartsReplaced.tsx` + `Gallery.tsx` | Parts list, then work-in-progress photos |
| After Restoration | `/after-restoration` | `Gallery.tsx` | Finished bike |
| Specs | `/specs` | `Specs.tsx` | Grouped spec cards: engine, chassis, suspension, brakes |
| MXA Review | `/mxa-review` | `MXAReview.tsx` | Summary of the MXA retro test of Mike Kiedrowski's factory 1990 CR125, with scanned pages |

### Pages and search

Every tab is a real page with its own URL, and `npm run build` pre-renders each one to static
HTML (`dist/index.html`, `dist/specs.html`, ...) with that page's text, styles, title,
description, canonical link and structured data already in it. Search engines index each page
separately without needing to run JavaScript. In the browser, the page then "hydrates" and tab
switches happen in place via the History API, without a full page load.

The pieces: `src/entry-server.tsx` renders a page to HTML, `scripts/prerender.mjs` writes the
files and fills in each page's `<head>`, and `vercel.json` (`cleanUrls`) serves `specs.html` at
`/specs`. Old links from before the switch (`/#specs`) are redirected to the new URLs in
`src/main.tsx`.

Because pages are rendered without knowing the screen size, layout that differs between phone
and desktop (hero height, short vs. long tab labels) is done with CSS breakpoints rather than
JavaScript. Otherwise the HTML and the browser's first render would disagree and the page
would jump on load.

The three gallery tabs all render the same `Gallery` component — it looks up its content by
`activeTab` from the `sections` array, so each one carries its own title, subtitle, photo list,
quilted column pattern, and row heights.

## Photos

All images live in `public/` and are referenced by absolute path, so they are served as-is
rather than hashed by the bundler.

```
public/photos/
├── as-found/      the bike as purchased, plus the listing screenshot
├── restoration/   work in progress
├── finished/      completed bike — the Hero uses profile-pipe-side.jpg
└── MXA/           scanned magazine pages for the MXA Review tab
```

Phone photos run 3–4MB each, which is far more than the site needs. After dropping new files
in, run:

```bash
npm run optimize-photos        # rewrite oversized photos in place
npm run optimize-photos -- --dry   # report what would change, write nothing
```

It resizes to 2000px (2560px for the hero banner), re-encodes at q82 with mozjpeg, and bakes
in EXIF orientation so nothing rotates. Magazine scans under `MXA/` keep their resolution and
are only recompressed. Files already within budget are skipped, and a re-encode that saves
less than 10% is discarded — so re-running is a no-op rather than a slow quality leak.

To add photos to a gallery, drop the files in the matching folder and add their paths to that
section's `photos` array in `src/components/Gallery.tsx`. Order in the array is the order shown,
and it also drives the lightbox order. The quilted layout repeats `colPattern` across the grid
(`2, 1, 1, 2, 2` for most sections), so a photo's tile width depends on its index — reordering
changes the layout, not just the sequence. On mobile the grid drops to 2 columns with an even
pattern.

The favicon and the hero banner both come from `public/photos/finished/`; the favicon is wired
up in `index.html`, the banner in `src/components/Hero.tsx`.

## Deploying

Hosted on Vercel, which builds and deploys automatically on every push to `main`. The build
output is a plain static site in `dist/` — no server code runs at request time. `vercel.json`
turns on `cleanUrls` (so `/specs` serves `specs.html`) and `trailingSlash: false` (so `/specs/`
redirects to `/specs`, matching the canonical URLs).
