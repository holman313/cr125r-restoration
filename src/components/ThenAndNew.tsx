import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/**
 * The factory studio shot next to the restored bike, side by side.
 *
 * The two images share the same orientation — left side of the bike, front
 * to the right — so the eye can jump between them without re-mapping the
 * geometry. That's the whole visual argument: 35 years apart, essentially
 * identical.
 *
 * The factory image is Honda's, not the owner's, so the card carries a
 * visible credit.
 */
export default function ThenAndNew() {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Then and New
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Thirty-five years apart. Honda's 1990 studio image, and the bike as it stands today.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
          alignItems: 'start',
        }}
      >
        {/*
          Both images share a 16:9 frame with object-fit: cover, so the two
          cards have the same height and the bikes read at the same visual
          scale. That's what makes the "essentially identical" argument
          land — mismatched heights would put the bikes at different
          sizes and undermine the comparison.
        */}
        <Card variant="outlined" sx={{ bgcolor: '#fff' }}>
          <Box
            component="img"
            src="/photos/factory/1990-cr125r-factory.jpg"
            alt="Honda's factory studio photograph of the 1990 CR125R"
            sx={{
              width: '100%',
              aspectRatio: '16 / 9',
              objectFit: 'contain',
              display: 'block',
              bgcolor: '#fff',
            }}
          />
          <CardContent sx={{ bgcolor: 'background.paper' }}>
            <Typography
              variant="overline"
              sx={{ color: 'error.main', fontWeight: 700, letterSpacing: 2, display: 'block' }}
            >
              1990 · From the factory
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Photo: Honda
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ bgcolor: 'background.paper' }}>
          <Box
            component="img"
            src="/photos/finished/profile-pipe-side.jpg"
            alt="The restored 1990 CR125R photographed today"
            sx={{
              width: '100%',
              aspectRatio: '16 / 9',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <CardContent>
            <Typography
              variant="overline"
              sx={{ color: 'error.main', fontWeight: 700, letterSpacing: 2, display: 'block' }}
            >
              2025 · After restoration
            </Typography>
            <Typography variant="caption" color="text.secondary">
              &nbsp;
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
