import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TAB_IDS, TAB_LABELS, TAB_LABELS_SHORT, type TabId } from '../tabs';

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
