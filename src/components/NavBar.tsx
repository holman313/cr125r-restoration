import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const TAB_IDS = [
  'my-story',
  'gallery-as-found',
  'gallery-restoration',
  'gallery-finished',
  'specs',
  'mxa-review',
] as const;

export type TabId = typeof TAB_IDS[number];

const TAB_LABELS: Record<TabId, string> = {
  'my-story': 'My Story',
  'gallery-as-found': 'As Found',
  'gallery-restoration': 'Restoration',
  'gallery-finished': 'After Restoration',
  'specs': 'Specs',
  'mxa-review': 'MXA Review',
};

// Phone screens fit roughly three full-length labels, which pushes Specs and
// MXA Review off-screen behind a scroll arrow. Shorter labels keep every tab
// reachable without scrolling.
const TAB_LABELS_SHORT: Record<TabId, string> = {
  'my-story': 'Story',
  'gallery-as-found': 'As Found',
  'gallery-restoration': 'Resto',
  'gallery-finished': 'Finished',
  'specs': 'Specs',
  'mxa-review': 'MXA',
};

interface NavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const labels = isMobile ? TAB_LABELS_SHORT : TAB_LABELS;

  return (
    <AppBar position="sticky">
      {/* Tabs row — full width on all screen sizes */}
      <Box>
        <Tabs
          value={activeTab}
          onChange={(_, val) => onTabChange(val as TabId)}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: '#fff' } }}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {TAB_IDS.map((id) => (
            <Tab
              key={id}
              value={id}
              label={labels[id]}
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
