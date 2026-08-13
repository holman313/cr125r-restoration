import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NAV_TAB_IDS, TAB_LABELS, TAB_LABELS_SHORT, type TabId } from '../tabs';

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
        {/* value={false} when the active tab isn't in the nav (i.e. the
            hero-CTA-driven show-gallery view). MUI otherwise warns that the
            value doesn't match any Tab child. */}
        <Tabs
          value={NAV_TAB_IDS.includes(activeTab) ? activeTab : false}
          onChange={(_, val) => onTabChange(val as TabId)}
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
