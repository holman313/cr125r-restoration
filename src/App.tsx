import { useCallback, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Specs from './components/Specs';
import MyStory from './components/MyStory';
import OriginalListing from './components/OriginalListing';
import PartsReplaced from './components/PartsReplaced';
import MXAReview from './components/MXAReview';
import ShowGallery from './components/ShowGallery';
import NotFound from './components/NotFound';
import { DEFAULT_TAB, NOT_FOUND_META, TAB_META, pathToTab, tabToPath, type TabId } from './tabs';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#cc0000',
    },
    error: {
      // Honda red, for fills: buttons, the 1990 card header, borders.
      // White text on it is 5.9:1, which passes WCAG AA.
      main: '#cc0000',
      // Red *text* on the dark background. #cc0000 text is only ~3:1 there
      // (AA needs 4.5:1 for small text); this lighter red is 5.4:1 on the
      // page and 5.0:1 on cards. Use `error.light` for any red lettering.
      light: '#ff3d3d',
    },
    background: {
      default: '#111111',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const GALLERY_TABS = new Set<TabId>(['gallery-as-found', 'gallery-restoration', 'gallery-finished']);

/**
 * Tab state backed by the page path: every tab is a real URL (`/specs`,
 * `/restoration`, ...), pre-rendered to its own HTML file at build time so
 * search engines can index each page's text. In the browser, switching tabs
 * uses the History API instead of a full page load, and the back button
 * walks back through tab changes.
 *
 * `null` means the path isn't a page: the not-found view, which the build
 * also writes to 404.html for Vercel to serve on unknown addresses.
 *
 * The starting tab comes in as a prop rather than being read from
 * `window` here, so the build-time render (no window) and the browser's
 * first render produce identical markup for hydration.
 */
function useTabRoute(initialTab: TabId | null): [TabId | null, (next: TabId) => void] {
  const [tab, setTab] = useState<TabId | null>(initialTab);

  useEffect(() => {
    const onPopState = () => setTab(pathToTab(window.location.pathname) ?? null);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Keep the browser tab title and description in step with the page. The
  // pre-rendered HTML already has the right values on first load; this
  // covers in-app tab switches.
  useEffect(() => {
    const meta = tab ? TAB_META[tab] : NOT_FOUND_META;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [tab]);

  const setActiveTab = useCallback((next: TabId) => {
    const path = tabToPath(next);
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setTab(next);
  }, []);

  return [tab, setActiveTab];
}

interface AppProps {
  /** The page to show; `null` renders the not-found view. */
  initialTab?: TabId | null;
}

export default function App({ initialTab = DEFAULT_TAB }: AppProps) {
  const [activeTab, setActiveTab] = useTabRoute(initialTab);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
      {/* One <main> landmark for the page content; NavBar and Footer supply
          their own (<header>/<footer>) so screen readers can jump between them. */}
      <main>
        <Hero compact={activeTab !== 'my-story'} />
        {activeTab === null && <NotFound onTabChange={setActiveTab} />}
        {activeTab === 'gallery-restoration' && <PartsReplaced />}
        {activeTab && GALLERY_TABS.has(activeTab) && <Gallery activeTab={activeTab} />}
        {activeTab === 'gallery-as-found' && <OriginalListing />}
        {activeTab === 'specs' && <Specs />}
        {activeTab === 'my-story' && <MyStory />}
        {activeTab === 'mxa-review' && <MXAReview />}
        {activeTab === 'show-gallery' && <ShowGallery />}
      </main>
      <Footer />
    </ThemeProvider>
  );
}
