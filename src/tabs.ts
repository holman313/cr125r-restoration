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
 * Titles stay near 60 characters and descriptions under ~160 so Google
 * shows them untruncated. Each leads with the words people actually search
 * ("1990 Honda CR125R", "CR 125", "restoration") for that page's subject.
 */
export const TAB_META: Record<TabId, { title: string; description: string }> = {
  'my-story': {
    title: '1990 Honda CR125R Restoration | CR 125 Revival',
    description:
      '1990 Honda CR125R restoration: a low-hour CR 125 that sat in a shop for 32 years, brought back to show condition. As found, the restore, parts list, and specs.',
  },
  'gallery-as-found': {
    title: '1990 Honda CR125R As Found, All Original | CR 125 Revival',
    description:
      'The 1990 Honda CR125R as it was bought in July 2025: low hours, all original, after 32 years in a shop. Photos and the original Marketplace listing.',
  },
  'gallery-restoration': {
    title: '1990 CR125R Restoration Parts List & Photos | CR 125 Revival',
    description:
      'What went into restoring a 1990 Honda CR125R: Boyesen reeds, FMF pipe, EVO Oregon suspension rebuild, all-new bearings, chain, sprockets, and tires.',
  },
  'gallery-finished': {
    title: 'Restored 1990 Honda CR125R Photos | CR 125 Revival',
    description:
      'The finished 1990 Honda CR125R restoration: profile, three-quarter, and detail photos of a show-ready CR 125, from the HPP engine to the Showa forks.',
  },
  specs: {
    title: '1990 Honda CR125R Specs & Features | CR 125 Revival',
    description:
      '1990 Honda CR125R specs: 125cc two-stroke with the first HPP power valve on a CR125, first-generation 45mm Showa inverted forks, 6-speed, disc brakes.',
  },
  'mxa-review': {
    title: "MXA Retro Test: Kiedrowski's Factory 1990 CR125 | CR 125 Revival",
    description:
      "Motocross Action's retro test of Mike Kiedrowski's factory 1990 Honda CR125, the bike he raced to the 125cc National title, versus the production CR125R.",
  },
  'show-gallery': {
    title: 'Selfie Time at the 125 Dream Race | CR 125 Revival',
    description:
      'Visitor photos with the 1990 Honda CR125R at the 125 Dream Race, Washougal MX.',
  },
};

/**
 * The tabs that get a pre-rendered page. Selfie Time is only included when
 * it's enabled at build time, so to open it next year set
 * VITE_SHOW_GALLERY=true in Vercel and redeploy (a deploy made before the
 * show window opens won't contain the page).
 */
export const PRERENDER_TABS: readonly TabId[] = TAB_IDS;
