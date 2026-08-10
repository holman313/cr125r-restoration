import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

const groups: { heading: string; body: ReactNode }[] = [
  {
    heading: 'Bodywork',
    body: (
      <>
        New front and rear fenders and side panels. The originals were still in good shape and
        were removed to protect them — see the <em>As Found</em> tab for the original plastics.
        Radiator shrouds and front number plate are still original.
      </>
    ),
  },
  { heading: 'Engine', body: 'Boyesen reeds, new carb gaskets.' },
  {
    heading: 'Exhaust',
    body:
      'FMF pipe with a Pro Circuit Shorty silencer. The original pipe is in great shape — just set aside for some FMF bling.',
  },
  {
    heading: 'Suspension',
    body: 'Full front and rear rebuild by EVO Oregon. New linkage and swingarm bearings.',
  },
  { heading: 'Drivetrain', body: 'New chain and sprockets.' },
  { heading: 'Wheels & brakes', body: 'New tires, tubes, wheel bearings, and brake pads.' },
  { heading: 'Controls', body: 'ODI grips.' },
];

export default function PartsReplaced() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom fontWeight={700}>
          What Was Replaced
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 640 }}>
          Low hours to start with, so what needed replacing were the parts that just get old on
          a bike from sitting for 32 years.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {groups.map((group) => (
            <Card key={group.heading} variant="outlined" sx={{ bgcolor: 'background.paper' }}>
              <CardContent sx={{ pb: '16px !important' }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: 'error.main',
                    fontWeight: 700,
                    letterSpacing: 2,
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  {group.heading}
                </Typography>
                <Typography variant="body1">{group.body}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
