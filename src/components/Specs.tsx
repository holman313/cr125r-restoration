import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const specGroups: { heading: string; rows: [string, string][] }[] = [
  {
    heading: 'Overview',
    rows: [
      ['Year', '1990'],
      ['Make', 'Honda'],
      ['Model', 'CR125R'],
      ['Class', 'Motocross / 125cc'],
      ['Color', 'Honda Red'],
    ],
  },
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
      ['Trail', '+7.5mm vs. previous model for sharper steering'],
      ['Steering Stem', 'Larger diameter — stiffer front end'],
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

export default function Specs() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Specifications
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {specGroups.map((group) => (
            <Box key={group.heading}>
              <Typography
                variant="overline"
                sx={{ color: 'error.main', fontWeight: 700, letterSpacing: 2, display: 'block', mb: 2 }}
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
