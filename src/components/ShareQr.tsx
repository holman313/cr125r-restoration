import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * QR pointing at the site, for showing someone the page at the bike rather
 * than spelling out a URL over a running two-stroke.
 *
 * The code sits on a white card because scanners read dark-on-light far more
 * reliably than the inverse, and the SVG's own quiet zone is preserved by the
 * card's padding. It's vector, so the same file prints cleanly at any size if
 * this ever becomes a placard.
 */
export default function ShareQr() {
  return (
    <Box
      sx={{
        mt: 6,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      <Box
        component="img"
        src="/qr-site.svg"
        alt="QR code linking to 1990cr125revival.com"
        sx={{
          width: 150,
          height: 150,
          p: 1.5,
          bgcolor: '#fff',
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <Box>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Scan to open this page
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
          Point a phone camera at the code to pull up the bike's story, specs, and photos.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'primary.main', fontWeight: 600 }}>
          1990cr125revival.com
        </Typography>
      </Box>
    </Box>
  );
}
