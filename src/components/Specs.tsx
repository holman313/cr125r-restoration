import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const specGroups: { heading: string; rows: [string, string][] }[] = [
  {
    heading: 'Engine',
    rows: [
      ['Type', '125cc two-stroke single'],
      ['Power Valve', 'Honda Power Port (HPP) — first year on CR125'],
      ['Powerband', 'Pro-oriented; strong top-end with improved mid-range via HPP'],
      ['Transmission', '6-speed'],
      ['Clutch', 'Bulletproof — virtually trouble-free'],
    ],
  },
  {
    heading: 'Chassis & Handling',
    rows: [
      ['Frame', 'Simple split steel cradle'],
      ['Steering', 'Revised geometry and a larger-diameter steering stem — stiffer front end'],
      ['Handling', 'Pinpoint steering response; light and flickable in the air'],
    ],
  },
  {
    heading: 'Suspension',
    rows: [
      ['Front Forks', '45mm Showa inverted (USD) — first generation on CR125'],
      ['Fork Notes', 'Undersprung with mid-stroke harshness; requires frequent oil changes'],
      ['Rear Shock', 'Showa — similar characteristics to front'],
    ],
  },
  {
    heading: 'Brakes & Reliability',
    rows: [
      ['Brakes', 'Single disc, front & rear — powerful with excellent feel'],
      ['Brake Notes', 'Completely trouble-free'],
      ['Durability', 'Virtually indestructible with proper maintenance'],
    ],
  },
];

/**
 * The 1989 → 1990 → 1991 comparison. Sources: PulpMX "Classic Steel"
 * retrospectives on the '89, '90 and '91 CR125R. Only points that several
 * of them agree on are stated here.
 */
const modelYears: { year: string; headline: string; points: string[]; current?: boolean }[] = [
  {
    year: '1989',
    headline: 'The end of an era',
    points: [
      'ATAC power valve, used on the CR125 since 1984',
      '43mm Showa conventional forks, the last right-side-up CR125 fork',
    ],
  },
  {
    year: '1990',
    headline: 'This bike',
    current: true,
    points: [
      'First HPP power valve on a CR125, borrowed from the CR250R',
      'First inverted forks on a CR125: 45mm Showa',
      'Larger steering stem for a stiffer front end',
    ],
  },
  {
    year: '1991',
    headline: 'The fix-up year',
    points: [
      'New frame, with the engine set lower',
      'Reworked 45mm Showa fork and a new Kayaba shock',
      "Bodywork from the 1990 CR250R and the era's loud graphics",
    ],
  },
];

function WhyNinety() {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="overline"
        component="h3"
        sx={{ color: 'error.light', fontWeight: 700, letterSpacing: 2, display: 'block', m: 0, mb: 1 }}
      >
        Why 1990 Matters
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 760 }}>
        The '89 was the last CR125 with conventional forks and the old ATAC power valve. For 1990
        Honda brought over the CR250R's HPP power valve and put inverted forks on the 125 for the
        first time. A year later the '91 got a new frame, CR250-style bodywork, and a reworked fork,
        so the 1990 stands alone: new engine and fork, original look. And the engine was a keeper:
        Honda kept it in the CR125, refined but never replaced, for at least the next decade.
      </Typography>
      {/* Each card's year sits in a filled header strip so, when the cards
          stack on a phone, every list of points is clearly attached to the
          year above it rather than floating between two years. */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 3, md: 2 },
        }}
      >
        {modelYears.map((m) => (
          <Card
            key={m.year}
            variant="outlined"
            sx={{
              bgcolor: 'background.paper',
              borderColor: m.current ? 'error.main' : 'rgba(255,255,255,0.2)',
              borderWidth: m.current ? 2 : 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 1.5,
                px: 2,
                py: 1.25,
                bgcolor: m.current ? 'error.main' : 'rgba(255,255,255,0.08)',
                borderBottom: '1px solid',
                borderColor: m.current ? 'error.main' : 'rgba(255,255,255,0.12)',
              }}
            >
              <Typography variant="h5" component="p" fontWeight={800} sx={{ color: '#fff', lineHeight: 1 }}>
                {m.year}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: m.current ? '#fff' : 'text.secondary',
                  fontWeight: m.current ? 700 : 400,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                }}
              >
                {m.headline}
              </Typography>
            </Box>
            <CardContent sx={{ pt: 1.5, pb: '16px !important' }}>
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                {m.points.map((p) => (
                  <Typography key={p} component="li" variant="body2" sx={{ mb: 0.5 }}>
                    {p}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default function Specs() {
  return (
    <Box component="section" aria-label="Specifications" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
          Specifications
        </Typography>

        <WhyNinety />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {specGroups.map((group) => (
            <Box key={group.heading}>
              <Typography
                variant="overline"
                component="h3"
                sx={{ color: 'error.light', fontWeight: 700, letterSpacing: 2, display: 'block', m: 0, mb: 2 }}
              >
                {group.heading}
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                    md: 'repeat(3, 1fr)',
                  },
                  gap: 2,
                }}
              >
                {group.rows.map(([label, value]) => (
                  <Card key={label} variant="outlined" sx={{ bgcolor: 'background.paper' }}>
                    <CardContent sx={{ pb: '16px !important' }}>
                      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                        {label}
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {value}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
              <Divider sx={{ mt: 5 }} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
