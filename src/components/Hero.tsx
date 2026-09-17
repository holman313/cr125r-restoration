import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
// the check doesn't run every render (react-hooks/purity).
const SHOW_ENDS = new Date('2026-08-31T00:00:00-07:00');
const EVENT_IN_PAST = Date.now() >= SHOW_ENDS.getTime();

export default function Hero({ compact = false }: HeroProps) {
  const theme = useTheme();
  // noSsr: this is a client-only Vite SPA, so use the real matchMedia value
  // on first render rather than the SSR default (false). Otherwise desktop
  // briefly renders the compact strip before hydration corrects it.
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  // The compact prop only takes effect on mobile. Desktop always renders the
  // full hero so the landscape photo isn't crushed into a strip.
  const compactActive = compact && !isDesktop;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: compactActive ? '17vh' : { xs: '40vh', md: '55vh' },
        overflow: 'hidden',
        transition: 'height 0.25s ease',
      }}
    >
      {/* The banner is the LCP image on every page, so it's eager and
          high-priority — everything else on the site lazy-loads. */}
      <Box
        component="img"
        {...srcSetProps('/photos/finished/profile-pipe-side.jpg', '100vw')}
        alt="1990 Honda CR125R"
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

      {/* Event-attribution mark — top-right of the hero, always visible.
          Language flips to past tense after the show window closes. Hidden
          only on the mobile-compact strip, where the right side would be
          crowded against the title. */}
      {!compactActive && (
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
            display: 'flex',
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
      )}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: compactActive ? 'row' : 'column',
          alignItems: compactActive ? 'center' : 'flex-start',
          justifyContent: compactActive ? 'space-between' : 'center',
          px: { xs: 3, md: 8 },
          gap: 2,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          {!compactActive && (
            <Typography
              variant="overline"
              sx={{ color: 'rgba(255,255,255,0.75)', letterSpacing: 4, mb: 1, display: 'block' }}
            >
              Classic Restoration
            </Typography>
          )}
          <Typography
            component="h1"
            fontWeight={800}
            sx={{
              m: 0,
              color: '#fff',
              lineHeight: 1.1,
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              fontSize: compactActive
                ? '1.1rem'
                : { xs: '2.2rem', sm: '3rem', md: '3.75rem' },
            }}
          >
            {compactActive ? (
              '1990 Honda CR125R'
            ) : (
              <>
                1990 Honda
                <br />
                CR125R
              </>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
