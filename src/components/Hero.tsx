import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SHOW_GALLERY_ENABLED, tabToSlug } from '../tabs';

interface HeroProps {
  /** Shrink to a slim banner so the section below starts above the fold. */
  compact?: boolean;
}

export default function Hero({ compact = false }: HeroProps) {
  // The "Become Famous" CTA only surfaces during the show window and only on
  // the full hero (My Story). The compact hero is deliberately slim to keep
  // section content above the fold on the other tabs; a button there would
  // undo that work.
  const showCta = SHOW_GALLERY_ENABLED && !compact;

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
      {/* Background photo */}
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

      {/* Red gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(180,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.2) 100%)',
        }}
      />

      {/* Text */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 8 },
        }}
      >
        {!compact && (
          <Typography
            variant="overline"
            sx={{ color: 'rgba(255,255,255,0.75)', letterSpacing: 4, mb: 1 }}
          >
            Classic Restoration
          </Typography>
        )}
        <Typography
          fontWeight={800}
          sx={{
            color: '#fff',
            lineHeight: 1.1,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            fontSize: compact
              ? { xs: '1.35rem', sm: '1.75rem', md: '2.25rem' }
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

        {showCta && (
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
    </Box>
  );
}
