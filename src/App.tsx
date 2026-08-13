import { useCallback, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Specs from './components/Specs';
import MyStory from './components/MyStory';
import OriginalListing from './components/OriginalListing';
import PartsReplaced from './components/PartsReplaced';
import MXAReview from './components/MXAReview';
import ShowGallery from './components/ShowGallery';
import { slugToTab, tabToSlug, type TabId } from './tabs';
import { themeFor, type ThemeMode } from './theme';

const GALLERY_TABS = new Set<TabId>(['gallery-as-found', 'gallery-restoration', 'gallery-finished']);

const DEFAULT_TAB: TabId = 'my-story';

const THEME_STORAGE_KEY = 'cr125:theme-mode';

/**
 * Deep-linkable tab state backed by the URL hash: sharing a link to a
 * specific tab lands the visitor there, and the browser back button walks
 * back through tab changes.
 *
 * Hash routing rather than the History API so it works on any static host
 * without server-side SPA fallback.
 */
function readTabFromHash(): TabId {
  if (typeof window === 'undefined') return DEFAULT_TAB;
  const slug = window.location.hash.replace(/^#/, '');
  return slugToTab(slug) ?? DEFAULT_TAB;
}

function useTabHash(): [TabId, (next: TabId) => void] {
  const [tab, setTab] = useState<TabId>(readTabFromHash);

  useEffect(() => {
    const onHashChange = () => setTab(readTabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const setActiveTab = useCallback((next: TabId) => {
    const desired = `#${tabToSlug(next)}`;
    if (window.location.hash !== desired) {
      window.location.hash = desired;
    }
    setTab(next);
  }, []);

  return [tab, setActiveTab];
}

/**
 * Theme mode with localStorage persistence. Default mode is the site's
 * normal presentation; the 90s toggle is remembered per browser so a
 * visitor who opted in doesn't need to re-flip it on every visit.
 */
function useThemeMode(): [ThemeMode, () => void] {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'default';
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'nineties' ? 'nineties' : 'default';
  });

  const toggle = useCallback(() => {
    setMode((prev) => {
      const next: ThemeMode = prev === 'nineties' ? 'default' : 'nineties';
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // localStorage unavailable (private mode, disabled) — carry on.
      }
      return next;
    });
  }, []);

  return [mode, toggle];
}

export default function App() {
  const [activeTab, setActiveTab] = useTabHash();
  const [themeMode, toggleTheme] = useThemeMode();

  return (
    <ThemeProvider theme={themeFor(themeMode)}>
      <CssBaseline />
      <NavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        themeMode={themeMode}
        onThemeToggle={toggleTheme}
      />
      <Hero compact={activeTab !== 'my-story'} themeMode={themeMode} />
      {activeTab === 'gallery-restoration' && <PartsReplaced />}
      {GALLERY_TABS.has(activeTab) && <Gallery activeTab={activeTab} />}
      {activeTab === 'gallery-as-found' && <OriginalListing />}
      {activeTab === 'specs' && <Specs />}
      {activeTab === 'my-story' && <MyStory />}
      {activeTab === 'mxa-review' && <MXAReview />}
      {activeTab === 'show-gallery' && <ShowGallery />}
    </ThemeProvider>
  );
}
