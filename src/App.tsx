import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar, { type TabId } from './components/NavBar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Specs from './components/Specs';
import MyStory from './components/MyStory';
import OriginalListing from './components/OriginalListing';
import MXAReview from './components/MXAReview';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#cc0000',
    },
    error: {
      main: '#cc0000',
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('my-story');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
      <Hero />
      {GALLERY_TABS.has(activeTab) && <Gallery activeTab={activeTab} />}
      {activeTab === 'gallery-as-found' && <OriginalListing />}
      {activeTab === 'specs' && <Specs />}
      {activeTab === 'my-story' && <MyStory />}
      {activeTab === 'mxa-review' && <MXAReview />}
    </ThemeProvider>
  );
}
