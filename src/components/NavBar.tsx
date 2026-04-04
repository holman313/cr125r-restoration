import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

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

interface NavBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function NavBar({ activeTab, onTabChange }: NavBarProps) {
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
              label={TAB_LABELS[id]}
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, minWidth: { xs: 'unset', sm: 90 } }}
            />
          ))}
        </Tabs>
      </Box>
    </AppBar>
  );
}
