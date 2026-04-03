import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, mr: 4, whiteSpace: 'nowrap' }}>
          1990 Honda CR125R
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(_, val) => onTabChange(val as TabId)}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: '#fff' } }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {TAB_IDS.map((id) => (
            <Tab key={id} value={id} label={TAB_LABELS[id]} />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
