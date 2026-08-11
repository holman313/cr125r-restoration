/**
 * Tab identity, labels, and URL slugs — one source of truth so the
 * navigation, the switching logic in App, and the URL-hash routing all agree
 * on what tabs exist and what they're called in each place.
 *
 * Adding a tab means adding an id here (plus its labels and slug), then a
 * branch in App.tsx to render the section.
 */

export const TAB_IDS = [
  'my-story',
  'gallery-as-found',
  'gallery-restoration',
  'gallery-finished',
  'specs',
  'mxa-review',
] as const;

export type TabId = (typeof TAB_IDS)[number];

export const TAB_LABELS: Record<TabId, string> = {
  'my-story': 'My Story',
  'gallery-as-found': 'As Found',
  'gallery-restoration': 'Restoration',
  'gallery-finished': 'After Restoration',
  specs: 'Specs',
  'mxa-review': 'MXA Review',
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
};

/**
 * URL hash fragments per tab. Kept short and human-readable — `#specs`
 * rather than internal ids like `#mxa-review` (kept) or `#my-story` (dropped
 * the `my-` prefix). What a visitor sees in the address bar and copies to
 * share.
 */
export const TAB_SLUGS: Record<TabId, string> = {
  'my-story': 'story',
  'gallery-as-found': 'as-found',
  'gallery-restoration': 'restoration',
  'gallery-finished': 'after-restoration',
  specs: 'specs',
  'mxa-review': 'mxa-review',
};

const SLUG_TO_TAB: Record<string, TabId> = Object.fromEntries(
  (Object.entries(TAB_SLUGS) as [TabId, string][]).map(([id, slug]) => [slug, id])
);

export function tabToSlug(id: TabId): string {
  return TAB_SLUGS[id];
}

export function slugToTab(slug: string): TabId | undefined {
  return SLUG_TO_TAB[slug];
}
