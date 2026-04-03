import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const highlights = [
  {
    label: 'The Bike',
    text: 'MXA got their hands on Mike "Kied" Kiedrowski\'s actual 1990 factory Honda CR125 — the bike he raced during his dominant 125cc National Championship season.',
  },
  {
    label: 'Factory Differences',
    text: 'The factory CR125 featured works components unavailable to the public: hand-ported cylinder, factory suspension valving, and magnesium engine cases to shed weight.',
  },
  {
    label: 'The Ride',
    text: 'MXA\'s test riders put the factory machine through its paces and compared it against the production CR125R — noting where Honda\'s factory team found extra performance.',
  },
  {
    label: 'Legacy',
    text: 'Kiedrowski\'s 1990 title on the CR125 is considered one of the defining moments of Honda\'s 125cc dominance — a run that lasted until Yamaha\'s YZ125 arrived in 1996.',
  },
];

const tags = ['1990 Honda CR125', 'Factory Bike', 'Mike Kiedrowski', 'MXA Retro Test', '125cc National Champion'];

const mxaPhotos = [
  { src: '/photos/MXA/Retro_7_e-scaled.jpg' },
  { src: '/photos/MXA/Retro_2_e-1170x1536.jpeg' },
  { src: '/photos/MXA/Retro_4_e-scaled.jpg' },
  { src: '/photos/MXA/Retro_5_e-1148x1536.jpeg' },
  { src: '/photos/MXA/Retro_1_e-scaled.jpg' },
  { src: '/photos/MXA/Retro_8_e-scaled.jpg' },
];

const clickableImg = (src: string, alt: string, sx: object, onClick: () => void) => (
  <Box
    key={src}
    component="img"
    src={src}
    alt={alt}
    onClick={onClick}
    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.85, transition: 'opacity 0.2s' }, ...sx }}
  />
);

export default function MXAReview() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <Box sx={{ bgcolor: 'background.default' }}>

      {/* ── Article content ── */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">

          {/* Header */}
          <Typography variant="overline" color="error.main" fontWeight={700} letterSpacing={2}>
            MXA Retro Test
          </Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 1, mb: 1 }}>
            We Ride Mike Kiedrowski's Factory Honda CR125
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            Motocross Action Magazine
          </Typography>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" color="error" />
            ))}
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Intro */}
          <Typography variant="body1" paragraph>
            Motocross Action Magazine's retro test series puts iconic machines back under scrutiny —
            and few bikes are more deserving than the 1990 Honda CR125 that carried Mike Kiedrowski
            to the 125cc National Championship. This isn't just a stock CR125 review: MXA tracked
            down Kied's actual factory machine and threw a leg over it.
          </Typography>
          <Typography variant="body1" paragraph>
            The 1990 CR125R was already a standout production bike — the first CR125 to feature
            Honda's Power Port (HPP) exhaust valve system, first-generation 45mm Showa inverted
            forks, and a chassis tuned for pinpoint steering. The factory version took all of that
            and turned it up several notches.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Highlight cards */}
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
            What MXA Covers
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
            {highlights.map((item) => (
              <Paper key={item.label} variant="outlined" sx={{ p: 3, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Typography
                  variant="overline"
                  color="error.main"
                  fontWeight={700}
                  sx={{ whiteSpace: 'nowrap', pt: 0.3 }}
                >
                  {item.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.text}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* CTA */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' },
              justifyContent: 'space-between',
              gap: 3,
              p: 3,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                Read the Full Article
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The complete retro test, photos, and factory bike details on Motocross Action Magazine.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="error"
              size="large"
              endIcon={<OpenInNewIcon />}
              href="https://motocrossactionmag.com/mxa-retro-test-we-ride-mike-kiedrowskis-factory-honda-cr125/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Read on MXA
            </Button>
          </Box>

        </Container>
      </Box>

      {/* ── Photo section ── */}
      <Box sx={{ pb: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Divider sx={{ mb: 6 }} />
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            MXA Photo Gallery
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 4 }}>
            Images courtesy of Motocross Action Magazine
          </Typography>

          {/* Row 1 — Full-width action hero */}
          {clickableImg(
            '/photos/MXA/Retro_7_e-scaled.jpg',
            'Kiedrowski railing a corner on the factory CR125',
            { width: '100%', height: { xs: 240, sm: 380, md: 480 }, objectFit: 'cover', objectPosition: 'center 30%', borderRadius: 2, display: 'block', mb: 1.5 },
            () => setLightboxIndex(0),
          )}

          {/* Row 2 — Three portrait detail shots */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 1.5, mb: 1.5 }}>
            {[
              { src: '/photos/MXA/Retro_2_e-1170x1536.jpeg', alt: 'HRC engine and exhaust detail', idx: 1 },
              { src: '/photos/MXA/Retro_4_e-scaled.jpg',     alt: 'Showa inverted fork detail',    idx: 2 },
              { src: '/photos/MXA/Retro_5_e-1148x1536.jpeg', alt: 'Handlebar and steering detail', idx: 3 },
            ].map((img) =>
              clickableImg(img.src, img.alt, { width: '100%', height: { xs: 180, sm: 260, md: 340 }, objectFit: 'cover', objectPosition: 'center', borderRadius: 2, display: 'block' }, () => setLightboxIndex(img.idx))
            )}
          </Box>

          {/* Row 3 — Static bike + jump shot */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '3fr 2fr' }, gap: 1.5 }}>
            {[
              { src: '/photos/MXA/Retro_1_e-scaled.jpg', alt: 'Factory CR125 on a stand — full profile', idx: 4 },
              { src: '/photos/MXA/Retro_8_e-scaled.jpg', alt: 'Kiedrowski launching off a jump',         idx: 5 },
            ].map((img) =>
              clickableImg(img.src, img.alt, { width: '100%', height: { xs: 220, sm: 300, md: 360 }, objectFit: 'cover', objectPosition: 'center', borderRadius: 2, display: 'block' }, () => setLightboxIndex(img.idx))
            )}
          </Box>

        </Container>
      </Box>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={mxaPhotos}
      />

    </Box>
  );
}
