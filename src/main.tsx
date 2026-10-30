import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import { inject } from '@vercel/analytics';
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
  // Vercel Web Analytics: cookieless visit counts, shown in the Vercel
  // dashboard. Runs only in the browser (never in the build-time render),
  // and also counts in-page tab switches, which change the URL through the
  // History API. `npm run dev` logs events to the console instead of
  // sending them.
  inject({ mode: import.meta.env.DEV ? 'development' : 'production' });

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
