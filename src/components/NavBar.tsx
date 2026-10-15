import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import type { MouseEvent } from 'react';
import { NAV_TAB_IDS, TAB_LABELS, TAB_LABELS_SHORT, tabToPath, type TabId } from '../tabs';

interface NavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

/**
 * Both label lengths are rendered and CSS shows the right one per screen
 * size. Choosing in JavaScript would make the pre-rendered HTML (which has
 * no screen size) disagree with a phone's first render.
 */
function TabLabel({ id }: { id: TabId }) {
  return (
    <>
      <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
        {TAB_LABELS_SHORT[id]}
      </Box>
      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
        {TAB_LABELS[id]}
      </Box>
    </>
  );
}

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  // Tabs are real links so crawlers can follow them to each page, but a
  // plain click switches in place without a page load. Modified clicks
  // (ctrl/cmd/shift/middle) fall through to the browser so "open in new
  // tab" still works.
  const onTabClick = (id: TabId) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onTabChange(id);
  };

  return (
    <AppBar position="sticky">
      <Box>
        {/* value={false} when the active tab isn't in the nav (i.e. the
            hero-CTA-driven show-gallery view). MUI otherwise warns that the
            value doesn't match any Tab child. */}
        <Tabs
          value={NAV_TAB_IDS.includes(activeTab) ? activeTab : false}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: '#fff' } }}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {NAV_TAB_IDS.map((id) => (
            <Tab
              key={id}
              value={id}
              component="a"
              href={tabToPath(id)}
              onClick={onTabClick(id)}
              label={<TabLabel id={id} />}
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                minWidth: { xs: 'unset', sm: 90 },
                px: { xs: 1.1, sm: 2 },
              }}
            />
          ))}
        </Tabs>
      </Box>
    </AppBar>
  );
}
