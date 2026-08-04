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
npm run build    # type-check (tsc -b) then build to dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
```

`npm run build` runs `tsc -b` first, so a type error fails the build.

## How the site is put together

`src/App.tsx` holds a single piece of state — the active tab — and renders `NavBar` and `Hero`
persistently above whichever section is selected. Tab IDs are defined once in
`src/components/NavBar.tsx` as the `TAB_IDS` const array; `TabId` is derived from it, so adding
a tab means adding an ID there, a label in `TAB_LABELS`, and a branch in `App.tsx`.

| Tab | Component | Notes |
| --- | --- | --- |
| My Story | `MyStory.tsx` | Default tab — the personal writeup |
| As Found | `Gallery.tsx` + `OriginalListing.tsx` | Gallery, then the Facebook Marketplace listing below it |
| Restoration | `Gallery.tsx` | Work-in-progress photos |
| After Restoration | `Gallery.tsx` | Finished bike |
| Specs | `Specs.tsx` | Grouped spec cards: overview, engine, chassis, suspension, brakes |
| MXA Review | `MXAReview.tsx` | Summary of the MXA retro test of Mike Kiedrowski's factory 1990 CR125, with scanned pages |

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
├── finished/      completed bike — includes banner.jpg used by the Hero
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

The build output is a plain static bundle in `dist/` — no server-side anything. There is no
deploy config committed to this repo (no CI workflow, no host config file), so publishing is
whatever you point at `dist/` after `npm run build`.
