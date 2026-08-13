import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SHOW_GALLERY_ENABLED, tabToSlug } from '../tabs';
import type { ThemeMode } from '../theme';

interface HeroProps {
  /** Shrink to a slim banner so the section below starts above the fold. */
  compact?: boolean;
  themeMode: ThemeMode;
}

export default function Hero({ compact = false, themeMode }: HeroProps) {
  const showCta = SHOW_GALLERY_ENABLED;
  const nineties = themeMode === 'nineties';

  // 90s mode swaps the red gradient for a stronger orange/red pulled from the
  // era's motocross posters, and the title/CTA lean on the display-type stack
  // set in the MUI theme. In default mode the overlay stays the current red-
  // to-transparent it always was.
  const overlay = nineties
    ? 'linear-gradient(to right, rgba(233,21,42,0.55) 0%, rgba(20,20,20,0.35) 55%, rgba(20,20,20,0.05) 100%)'
    : 'linear-gradient(to right, rgba(180,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.2) 100%)';

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: compact ? { xs: '17vh', md: '24vh' } : { xs: '40vh', md: '55vh' },
        overflow: 'hidden',
        transition: 'height 0.25s ease',
      }}
    >
      <Box
        component="img"
        src="/photos/finished/banner.jpg"
        alt="1990 Honda CR125R"
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
          background: overlay,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: compact ? 'row' : 'column',
          alignItems: compact ? 'center' : 'flex-start',
          justifyContent: compact ? 'space-between' : 'center',
          px: { xs: 3, md: 8 },
          gap: 2,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          {!compact && (
            <Typography
              variant="overline"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: 4,
                mb: 1,
                display: 'block',
                fontFamily: nineties
                  ? '"Impact", "Haettenschweiler", "Franklin Gothic Bold", "Arial Black", sans-serif'
                  : undefined,
                fontWeight: nineties ? 900 : undefined,
              }}
            >
              Classic Restoration
            </Typography>
          )}
          <Typography
            fontWeight={nineties ? 900 : 800}
            sx={{
              color: '#fff',
              lineHeight: 1.05,
              textShadow: nineties
                ? '3px 3px 0 rgba(20,20,20,0.7), 0 2px 12px rgba(0,0,0,0.6)'
                : '0 2px 12px rgba(0,0,0,0.6)',
              fontFamily: nineties
                ? '"Impact", "Haettenschweiler", "Franklin Gothic Bold", "Arial Black", sans-serif'
                : undefined,
              letterSpacing: nineties ? '0.02em' : undefined,
              textTransform: nineties ? 'uppercase' : undefined,
              fontSize: compact
                ? { xs: '1.1rem', sm: '1.5rem', md: '2rem' }
                : { xs: '2.2rem', sm: '3rem', md: '3.75rem' },
            }}
          >
            {compact ? (
              '1990 Honda CR125R'
            ) : (
              <>
                1990 Honda
                <br />
                CR125R
              </>
            )}
          </Typography>

          {showCta && !compact && (
            <Box sx={{ mt: { xs: 2.5, md: 3.5 } }}>
              <Button
                href={`#${tabToSlug('show-gallery')}`}
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 1,
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.1, md: 1.4 },
                  fontSize: { xs: '0.9rem', md: '1.05rem' },
                  boxShadow: '0 6px 24px rgba(204,0,0,0.55)',
                  '&:hover': {
                    boxShadow: '0 8px 28px rgba(204,0,0,0.7)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
              >
                Become Famous →
              </Button>
              <Typography
                sx={{
                  mt: 1,
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: { xs: '0.8rem', md: '0.95rem' },
                  textShadow: '0 1px 6px rgba(0,0,0,0.6)',
                }}
              >
                Post a photo with the bike — it lands on the show wall.
              </Typography>
            </Box>
          )}
        </Box>

        {showCta && compact && (
          <Button
            href={`#${tabToSlug('show-gallery')}`}
            variant="contained"
            color="primary"
            sx={{
              flexShrink: 0,
              fontWeight: 800,
              letterSpacing: 0.5,
              borderRadius: 999,
              px: { xs: 1.75, md: 2.5 },
              py: { xs: 0.6, md: 0.85 },
              fontSize: { xs: '0.7rem', md: '0.85rem' },
              boxShadow: '0 4px 16px rgba(204,0,0,0.55)',
              '&:hover': { boxShadow: '0 6px 20px rgba(204,0,0,0.7)' },
              transition: 'box-shadow 0.2s ease',
            }}
          >
            Become Famous →
          </Button>
        )}
      </Box>

      {/* Event-attribution mark in 90s mode: bottom-right of the hero, plain
          "showing at" credit rather than a decorative element. Only appears
          in 90s mode; hidden by default so the default hero stays clean. */}
      {nineties && !compact && (
        <Box
          component="a"
          href="https://www.125dreamrace.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Showing at the 125 Dream Race"
          sx={{
            position: 'absolute',
            right: { xs: 12, md: 20 },
            bottom: { xs: 12, md: 20 },
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            bgcolor: 'rgba(251,243,216,0.92)',
            border: '2px solid #141414',
            borderRadius: 1,
            px: 1.25,
            py: 0.75,
            textDecoration: 'none',
            color: '#141414',
            boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
            '&:hover': { bgcolor: '#FBF3D8' },
            transition: 'background-color 0.15s ease',
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily:
                '"Impact", "Haettenschweiler", "Franklin Gothic Bold", "Arial Black", sans-serif',
              fontSize: { xs: '0.65rem', md: '0.75rem' },
              letterSpacing: '0.1em',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            Showing at
          </Box>
          <Box
            component="img"
            src="/images/125dr-logo.jpg"
            alt="125 Dream Race"
            sx={{ height: { xs: 32, md: 40 }, width: 'auto', display: 'block' }}
          />
        </Box>
      )}
    </Box>
  );
}
