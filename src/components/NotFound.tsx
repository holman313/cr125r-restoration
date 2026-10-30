import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { MouseEvent } from 'react';
import { NAV_TAB_IDS, TAB_LABELS, tabToPath, type TabId } from '../tabs';

interface NotFoundProps {
  onTabChange: (tab: TabId) => void;
}

/**
 * Shown for any address that isn't a page. The build writes this view to
 * 404.html, which Vercel serves (with a 404 status) for unknown paths, so a
 * stale or mistyped link lands somewhere useful instead of a bare error.
 */
export default function NotFound({ onTabChange }: NotFoundProps) {
  // Real links (crawlable, open-in-new-tab works); a plain click switches in
  // place, the same as the nav tabs.
  const onLinkClick = (id: TabId) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onTabChange(id);
    window.scrollTo(0, 0);
  };

  return (
    <Box component="section" aria-label="Page not found" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 620 }}>
          That page doesn't exist. It may be an old or mistyped link. Here's everything on the site:
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          {NAV_TAB_IDS.map((id) => (
            <Typography key={id} component="li" variant="body1" sx={{ mb: 1 }}>
              <Link
                href={tabToPath(id)}
                onClick={onLinkClick(id)}
                sx={{ color: 'error.light', textDecorationColor: 'inherit', fontWeight: 600 }}
              >
                {TAB_LABELS[id]}
              </Link>
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
