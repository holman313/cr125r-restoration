import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

/**
 * Event strip for the 125 Dream Race, styled as a VHS on-screen display to nod
 * at the event's 90s theme.
 *
 * Deliberately self-contained: every style lives in this file and nothing here
 * touches the MUI theme, so removing the banner is deleting this file and its
 * one line in App.tsx. Text and a link only — no event logos or artwork.
 *
 * To retire it early, flip SHOW_EVENT_BANNER to false.
 */
const SHOW_EVENT_BANNER = true;

/**
 * Failsafe so a forgotten flag doesn't leave a stale "upcoming event" on the
 * site. Washougal runs on Pacific time and the offset is written out, so the
 * cutoff is the same moment regardless of the viewer's own time zone.
 */
const EVENT_ENDS = new Date('2026-08-31T00:00:00-07:00');

const EVENT_URL = 'https://www.125dreamrace.com/';

export default function EventBanner() {
  if (!SHOW_EVENT_BANNER || Date.now() > EVENT_ENDS.getTime()) return null;

  return (
    <Box
      component="aside"
      aria-label="Upcoming event"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#080808',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        py: { xs: 0.9, sm: 1.1 },
        px: { xs: 1.5, sm: 3 },
        // Scanlines
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(to bottom, rgba(0,0,0,0.38) 0px, rgba(0,0,0,0.38) 1px, transparent 1px, transparent 3px)',
        },
        '@keyframes tracking': {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(2000%)' },
        },
        '@keyframes blink': {
          '0%, 45%': { opacity: 1 },
          '50%, 95%': { opacity: 0.15 },
          '100%': { opacity: 1 },
        },
      }}
    >
      {/* Drifting tape-tracking band */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '3px',
          pointerEvents: 'none',
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
          filter: 'blur(1px)',
          animation: 'tracking 6.5s linear infinite',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 0 },
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 1, sm: 1.5 },
          fontFamily: '"Courier New", Courier, monospace',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: { xs: '0.04em', sm: '0.09em' },
          fontSize: { xs: '0.63rem', sm: '0.78rem' },
          lineHeight: 1.5,
          color: '#f2f2f2',
          // Chromatic fringing, the way a worn tape smears colour off an edge
          textShadow: '1px 0 rgba(255,0,64,0.55), -1px 0 rgba(0,229,255,0.45)',
        }}
      >
        <Box
          component="span"
          sx={{
            display: { xs: 'none', sm: 'inline' },
            color: '#2ecc71',
            animation: 'blink 2.4s steps(1, end) infinite',
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          ▶ Play
        </Box>

        {/* Phone screens get the short form so the strip stays one line and
            doesn't eat the fold it took work to free up. */}
        <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
          125 Dream Race
          <Box component="span" sx={{ opacity: 0.55, mx: 0.5 }}>
            ·
          </Box>
          Aug 29–30
          <Box component="span" sx={{ opacity: 0.55, mx: 0.5 }}>
            ·
          </Box>
        </Box>

        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
          Showing at the 15th Annual 125 Dream Race
          <Box component="span" sx={{ opacity: 0.55, mx: 0.75 }}>
            ·
          </Box>
          Washougal
          <Box component="span" sx={{ opacity: 0.55, mx: 0.75 }}>
            ·
          </Box>
          Aug 29–30, 2026
        </Box>

        <Link
          href={EVENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#ffd54a',
            textDecorationColor: 'rgba(255,213,74,0.45)',
            whiteSpace: 'nowrap',
            '&:hover': { color: '#fff' },
          }}
        >
          Event info →
        </Link>
      </Box>
    </Box>
  );
}
