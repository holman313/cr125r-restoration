import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Site-wide footer that credits Dirt Bandit Products — a friend's dirt-bike
 * cleaning-product company — with a link out to their site. Sits below every
 * tab's content, small enough not to compete with the page above but visible
 * enough to earn the click.
 *
 * The logo has a black background baked into the image, so it sits naturally
 * on the site's dark ground with no card or border needed around it.
 */
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 5, md: 6 },
        px: 3,
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        bgcolor: 'background.default',
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.15em',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        No restoration is complete without
      </Typography>

      <Box
        component="a"
        href="https://dirtbanditproducts.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Dirt Bandit Products"
        sx={{
          display: 'inline-block',
          lineHeight: 0,
          transition: 'transform 0.15s ease, opacity 0.15s ease',
          '&:hover': { transform: 'translateY(-1px)', opacity: 0.92 },
        }}
      >
        <Box
          component="img"
          src="/images/dirt-bandit-logo.jpg"
          alt="Dirt Bandit Products"
          loading="lazy"
          sx={{
            width: '100%',
            maxWidth: { xs: 240, sm: 280, md: 320 },
            height: 'auto',
            // Intrinsic 741×219 — reserves the box before the file loads.
            aspectRatio: '741 / 219',
            display: 'block',
          }}
        />
      </Box>
    </Box>
  );
}
