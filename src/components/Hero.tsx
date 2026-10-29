import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { srcSetProps } from '../responsiveImage';

interface HeroProps {
  /**
   * On mobile only: shrink to a slim banner so the section below starts above
   * the fold. On desktop the hero stays full-height regardless — a squished
   * letterbox of a landscape photo looks bad wide, and there's plenty of
   * vertical room without pushing content off-screen.
   */
  compact?: boolean;
}

// The show ends late Aug 30 Pacific; after that the "SHOWING AT" tense stops
// making sense and we flip to "SHOWN AT". Evaluated once at module load so
// the check doesn't run every render (react-hooks/purity). Pages are
// pre-rendered at build time, so a deploy made before the show ends will
// still say "Showing at" in its HTML until the next deploy.
const SHOW_ENDS = new Date('2026-08-31T00:00:00-07:00');
const EVENT_IN_PAST = Date.now() >= SHOW_ENDS.getTime();

/**
 * Everything that differs between the mobile-compact strip and the full hero
 * is chosen by CSS breakpoints, not JavaScript. The pages are pre-rendered
 * without knowing the screen size, so a JS check would render one layout in
 * the HTML and another in the browser, and the hero would jump on load.
 */
export default function Hero({ compact = false }: HeroProps) {
  // `xs` covers phones and small tablets; `md` and up is always the full hero.
  const onMobile = <T,>(compactValue: T, fullValue: T) => (compact ? compactValue : fullValue);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: onMobile('17vh', '40vh'), md: '55vh' },
        overflow: 'hidden',
        transition: 'height 0.25s ease',
      }}
    >
      {/* The banner is the LCP image on every page, so it's eager and
          high-priority — everything else on the site lazy-loads. */}
      <Box
        component="img"
        {...srcSetProps('/photos/finished/profile-pipe-side.jpg', '100vw')}
        alt="Restored 1990 Honda CR125, pipe side"
        loading="eager"
        fetchPriority="high"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(180,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.2) 100%)',
        }}
      />

      {/* Event-attribution mark — top-right of the hero. Language flips to
          past tense after the show window closes. Hidden only on the
          mobile-compact strip, where the right side would be crowded
          against the title. */}
      <Box
        component="a"
        href="https://www.125dreamrace.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${EVENT_IN_PAST ? 'Shown' : 'Showing'} at the 125 Dream Race`}
        sx={{
          position: 'absolute',
          top: { xs: 12, md: 20 },
          right: { xs: 12, md: 20 },
          display: { xs: onMobile('none', 'flex'), md: 'flex' },
          alignItems: 'center',
          gap: 1.25,
          bgcolor: 'rgba(255,255,255,0.94)',
          border: '2px solid #141414',
          borderRadius: 1,
          px: 1.25,
          py: 0.75,
          textDecoration: 'none',
          color: '#141414',
          boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
          '&:hover': { bgcolor: '#fff' },
          transition: 'background-color 0.15s ease',
          zIndex: 2,
        }}
      >
        <Box
          component="span"
          sx={{
            fontFamily:
              '"Impact", "Haettenschweiler", "Franklin Gothic Bold", "Arial Black", sans-serif',
            fontSize: { xs: '0.6rem', md: '0.72rem' },
            letterSpacing: '0.1em',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}
        >
          {EVENT_IN_PAST ? 'Shown at' : 'Showing at'}
        </Box>
        <Box
          component="img"
          src="/images/125dr-logo.jpg"
          alt="125 Dream Race"
          sx={{ height: { xs: 30, md: 38 }, width: 'auto', aspectRatio: '1 / 1', display: 'block' }}
        />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: { xs: onMobile('row', 'column'), md: 'column' },
          alignItems: { xs: onMobile('center', 'flex-start'), md: 'flex-start' },
          justifyContent: { xs: onMobile('space-between', 'center'), md: 'center' },
          px: { xs: 3, md: 8 },
          gap: 2,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="overline"
            sx={{
              color: 'rgba(255,255,255,0.75)',
              letterSpacing: 4,
              mb: 1,
              display: { xs: onMobile('none', 'block'), md: 'block' },
            }}
          >
            Classic Restoration
          </Typography>
          <Typography
            component="h1"
            fontWeight={800}
            sx={{
              m: 0,
              color: '#fff',
              lineHeight: 1.1,
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              fontSize: {
                xs: onMobile('1.1rem', '2.2rem'),
                sm: onMobile('1.5rem', '3rem'),
                md: '3.75rem',
              },
            }}
          >
            {/* Two lines on the full hero, one line on the compact strip:
                hiding the <br> lets the space before it join the words. */}
            1990 Honda{' '}
            <Box component="br" sx={{ display: { xs: onMobile('none', 'inline'), md: 'inline' } }} />
            CR125R
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
