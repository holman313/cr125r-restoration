/**
 * Tab identity, labels, and URL slugs — one source of truth so the
 * navigation, the switching logic in App, the page URLs, and the build-time
 * pre-render all agree
 * on what tabs exist and what they're called in each place.
 *
 * Adding a tab means adding an id here (plus its labels and slug), then a
 * branch in App.tsx to render the section.
 */

/**
 * "At the Show" is a live-updating gallery of visitor submissions during the
 * event weekend. Auto-opens Saturday morning and auto-closes Monday
 * morning — same pattern as the EventBanner date guard, so nothing needs
 * flipping on show day.
 *
 * VITE_SHOW_GALLERY is an optional override: set to "true" to force the
 * tab on (e.g. to test before the window opens), "false" to force it off
 * (kill switch during the show). Unset means "use the dates."
 *
 * Decided at module load, matching the EventBanner: whether the tab exists
 * is a per-session fact, not per-render, and reading Date.now() inside a
 * component would trip react-hooks/purity.
 */
const SHOW_WINDOW_START = new Date('2026-08-29T00:00:00-07:00');
const SHOW_WINDOW_END = new Date('2026-08-31T00:00:00-07:00');
const OVERRIDE = import.meta.env.VITE_SHOW_GALLERY as string | undefined;
const NOW = Date.now();
const IN_WINDOW = NOW >= SHOW_WINDOW_START.getTime() && NOW < SHOW_WINDOW_END.getTime();
const SHOW_GALLERY_ENABLED =
  OVERRIDE === 'true' ? true : OVERRIDE === 'false' ? false : IN_WINDOW;

const BASE_TAB_IDS = [
  'my-story',
  'gallery-as-found',
  'gallery-restoration',
  'gallery-finished',
  'specs',
  'mxa-review',
  'show-gallery',
] as const;

export type TabId = (typeof BASE_TAB_IDS)[number];

export const TAB_IDS: readonly TabId[] = SHOW_GALLERY_ENABLED
  ? BASE_TAB_IDS
  : BASE_TAB_IDS.filter((id) => id !== 'show-gallery');

/**
 * The tabs the NavBar renders. Deliberately excludes show-gallery even when
 * the show window is open — that tab is surfaced through a "Become Famous"
 * hero CTA instead, keeping the nav at 6 tabs on phones during the event.
 * The gallery is still reachable at /selfie-time; only its nav chip is
 * suppressed.
 */
export const NAV_TAB_IDS: readonly TabId[] = TAB_IDS.filter((id) => id !== 'show-gallery');

export { SHOW_GALLERY_ENABLED };

export const TAB_LABELS: Record<TabId, string> = {
  'my-story': 'My Story',
  'gallery-as-found': 'As Found',
  'gallery-restoration': 'Restoration',
  'gallery-finished': 'After Restoration',
  specs: 'Specs',
  'mxa-review': 'MXA Review',
  'show-gallery': 'Selfie Time',
};

/**
 * Phone screens fit roughly three full-length labels, which pushes Specs and
 * MXA Review off-screen behind a scroll arrow. Shorter labels keep every tab
 * reachable without scrolling.
 */
export const TAB_LABELS_SHORT: Record<TabId, string> = {
  'my-story': 'Story',
  'gallery-as-found': 'As Found',
  'gallery-restoration': 'Resto',
  'gallery-finished': 'Finished',
  specs: 'Specs',
  'mxa-review': 'MXA',
  'show-gallery': 'Selfie',
};

/**
 * URL slug per tab. Each tab is its own page at `/<slug>` (My Story lives at
 * `/`), pre-rendered to static HTML at build time so search engines index
 * every page's text. The same slugs were used as `#hash` fragments before
 * the switch to real paths, so old `/#specs` links map straight across.
 */
export const TAB_SLUGS: Record<TabId, string> = {
  'my-story': 'story',
  'gallery-as-found': 'as-found',
  'gallery-restoration': 'restoration',
  'gallery-finished': 'after-restoration',
  specs: 'specs',
  'mxa-review': 'mxa-review',
  'show-gallery': 'selfie-time',
};

const SLUG_TO_TAB: Record<string, TabId> = Object.fromEntries(
  (Object.entries(TAB_SLUGS) as [TabId, string][]).map(([id, slug]) => [slug, id])
);

export function tabToSlug(id: TabId): string {
  return TAB_SLUGS[id];
}

/**
 * Resolves a URL slug to a tab id. Returns undefined for unknown slugs and,
 * importantly, for tabs that are currently gated off — so a stale
 * #at-the-show bookmark after the show ends falls back to the default
 * rather than silently opening a dormant tab.
 */
export function slugToTab(slug: string): TabId | undefined {
  const id = SLUG_TO_TAB[slug];
  if (!id) return undefined;
  return (TAB_IDS as readonly TabId[]).includes(id) ? id : undefined;
}

export const DEFAULT_TAB: TabId = 'my-story';

/** The page path for a tab: My Story is the home page, the rest are `/<slug>`. */
export function tabToPath(id: TabId): string {
  return id === DEFAULT_TAB ? '/' : `/${TAB_SLUGS[id]}`;
}

/**
 * Resolves a page path to a tab. Tolerates a trailing slash and a `.html`
 * suffix (the pre-rendered files are `specs.html` etc.). Returns undefined
 * for paths that aren't a page.
 */
export function pathToTab(pathname: string): TabId | undefined {
  const slug = pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
  if (slug === '' || slug === 'index') return DEFAULT_TAB;
  const id = slugToTab(slug);
  return id === DEFAULT_TAB ? undefined : id;
}

/**
 * Per-page title and description for search results and link previews.
 * The pre-render step writes these into each page's <head>; the client
 * updates document.title from them when switching tabs.
 *
 * Written for how people search. Search Console (Oct 2026) showed every
 * query that found the site included "1990" (e.g. "1990 cr125",
 * "1990 cr125r specs"), so titles lead with "1990". Each also carries
 * "CR125" and the spaced "CR 125" (every title's suffix), and Specs uses
 * "CR125R" because that is how people search for specs. Each spelling
 * appears about once per field; repeating them more reads as keyword
 * stuffing to Google. Titles stay under 60 characters and descriptions
 * under 160 so Google shows them untruncated.
 */
export const TAB_META: Record<TabId, { title: string; description: string }> = {
  'my-story': {
    title: '1990 Honda CR125 Restoration | CR 125 Revival',
    description:
      '1990 Honda CR125 restoration: a low-hour CR 125 that sat in a shop for 32 years, brought back to show condition. As found, the restore, parts list, and specs.',
  },
  'gallery-as-found': {
    title: '1990 Honda CR125 As Found, All Original | CR 125 Revival',
    description:
      'A 1990 Honda CR125 as it was bought in July 2025: low hours, all original, after 32 years in a shop. CR 125 photos and the original Marketplace listing.',
  },
  'gallery-restoration': {
    title: '1990 Honda CR125 Restoration Parts List | CR 125 Revival',
    description:
      'Honda CR125 restoration parts list: Boyesen reeds, FMF pipe, EVO Oregon suspension rebuild, all-new bearings, chain, sprockets, and tires on a 1990 CR 125.',
  },
  'gallery-finished': {
    title: 'Restored 1990 Honda CR125 Photos | CR 125 Revival',
    description:
      'Finished Honda CR125 restoration photos: a show-ready 1990 CR 125 in profile, three-quarter, and detail shots, from the HPP engine to the Showa forks.',
  },
  specs: {
    title: '1990 Honda CR125R Specs: vs 1989 & 1991 | CR 125 Revival',
    description:
      'Honda CR125 specs, with the 1989, 1990, and 1991 CR 125 compared: the first HPP power valve and first inverted Showa forks on a CR125, 6-speed, disc brakes.',
  },
  'mxa-review': {
    title: "Kiedrowski's 1990 Factory CR125: MXA Test | CR 125 Revival",
    description:
      "Motocross Action's retro test of Mike Kiedrowski's factory 1990 Honda CR125, winner of four 125 Nationals that season, versus the stock CR 125.",
  },
  'show-gallery': {
    title: '1990 Honda CR125 at the 125 Dream Race | CR 125 Revival',
    description:
      'Visitor photos with a restored 1990 Honda CR125 at the 125 Dream Race, Washougal MX: the CR 125 Revival show gallery.',
  },
};

/** Title and description for the not-found page (404.html). */
export const NOT_FOUND_META = {
  title: 'Page Not Found | CR 125 Revival',
  description: 'That page does not exist on the 1990 Honda CR125 Revival site.',
};

/**
 * The tabs that get a pre-rendered page. Selfie Time is only included when
 * it's enabled at build time, so to open it next year set
 * VITE_SHOW_GALLERY=true in Vercel and redeploy (a deploy made before the
 * show window opens won't contain the page).
 */
export const PRERENDER_TABS: readonly TabId[] = TAB_IDS;
