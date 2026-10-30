import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import App from './App.tsx';
import { createEmotionCache } from './emotionCache';
import { pathToTab, slugToTab, tabToPath } from './tabs';

/**
 * Links shared before the switch to real page URLs look like `/#specs`.
 * Send them to the page they meant. A full replace (not pushState) so the
 * browser loads that page's own pre-rendered HTML.
 */
function redirectLegacyHash(): boolean {
  const slug = window.location.hash.replace(/^#/, '');
  if (!slug || window.location.pathname !== '/') return false;
  const tab = slugToTab(slug);
  if (!tab) return false;
  const path = tabToPath(tab);
  if (path === '/') {
    // `/#story` is already the right page; just tidy the address bar.
    window.history.replaceState(null, '', '/');
    return false;
  }
  window.location.replace(path);
  return true;
}

if (!redirectLegacyHash()) {
  // Unknown paths get null: the not-found view, matching the pre-rendered
  // 404.html that Vercel serves for them.
  const initialTab = pathToTab(window.location.pathname) ?? null;
  const tree = (
    <StrictMode>
      <CacheProvider value={createEmotionCache()}>
        <App initialTab={initialTab} />
      </CacheProvider>
    </StrictMode>
  );

  const root = document.getElementById('root')!;
  // Production pages arrive pre-rendered, so attach to the existing markup.
  // `npm run dev` serves an empty #root, so render from scratch there.
  if (root.hasChildNodes()) {
    hydrateRoot(root, tree);
  } else {
    createRoot(root).render(tree);
  }
}
