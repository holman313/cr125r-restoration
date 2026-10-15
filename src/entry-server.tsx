// Build-time entry only (never loaded by the dev server), so the fast-refresh
// rule about mixing component and non-component exports doesn't apply.
/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import App from './App';
import { createEmotionCache } from './emotionCache';
import type { TabId } from './tabs';

export { PRERENDER_TABS, TAB_META, tabToPath } from './tabs';

/**
 * Build-time render of one page, used by scripts/prerender.mjs. Returns the
 * page markup plus the <style> tags for exactly the MUI styles that markup
 * uses, so the page is styled before any JavaScript runs.
 */
export function render(tab: TabId): { html: string; styles: string } {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const html = renderToString(
    <StrictMode>
      <CacheProvider value={cache}>
        <App initialTab={tab} />
      </CacheProvider>
    </StrictMode>,
  );

  const styles = constructStyleTagsFromChunks(extractCriticalToChunks(html));
  return { html, styles };
}
