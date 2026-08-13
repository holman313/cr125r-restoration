/**
 * Tab identity, labels, and URL slugs — one source of truth so the
 * navigation, the switching logic in App, and the URL-hash routing all agree
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
 * The gallery is still URL-routable via #at-the-show; only its nav chip is
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
  'show-gallery': 'At the Show',
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
  'show-gallery': 'Show',
};

/**
 * URL hash fragments per tab. Kept short and human-readable — `#specs`
 * rather than internal ids. What a visitor sees in the address bar and
 * copies to share.
 */
export const TAB_SLUGS: Record<TabId, string> = {
  'my-story': 'story',
  'gallery-as-found': 'as-found',
  'gallery-restoration': 'restoration',
  'gallery-finished': 'after-restoration',
  specs: 'specs',
  'mxa-review': 'mxa-review',
  'show-gallery': 'at-the-show',
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
