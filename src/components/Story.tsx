import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function Story() {
  return (
    <Box id="story" sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom fontWeight={700}>
          The Story
        </Typography>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            By 1990, Honda's CR125R was already a legend in the making — but this was the year it took
            a significant leap forward. Honda introduced the Honda Power Port (HPP) system to the CR125
            for the first time, using sliding guillotine valves controlled by a centrifugally activated
            ball governor to adjust exhaust port timing on the fly. The result was a motorcycle that
            delivered more power in stock trim than most of the competition's modified bikes.
          </Typography>
          <Typography variant="body1" paragraph>
            The powerband remained distinctly pro-oriented — screaming top-end performance with a
            snappy mid-range — but the HPP brought a new layer of usability without taming the
            CR125's aggressive character. The six-speed gearbox shifted with precision, and the
            clutch earned a reputation for being virtually bulletproof.
          </Typography>
          <Typography variant="body1" paragraph>
            Racing results in 1990 spoke for themselves. Mike Kiedrowski and Jean-Michel Bayle —
            two of the era's most gifted riders — put the CR125 on top, cementing Honda's dominance
            in the 125 class that would last well into the decade.
          </Typography>
          <Typography variant="body1" paragraph>
            The bike wasn't without flaws. Its first-generation 45mm Showa inverted forks were
            groundbreaking in concept but suffered from mid-stroke harshness and were notoriously
            prone to contamination, requiring frequent oil changes to stay healthy. The rear shock
            had similar tendencies. Yet despite the suspension's shortcomings, the frame itself
            was razor-sharp — light, flickable, and responsive in the air in a way few bikes of
            the era could match.
          </Typography>
          <Typography variant="body1">
            More than thirty years on, the 1990 CR125R remains one of the most sought-after
            classic motocross bikes in existence: a time capsule of an era when two-strokes ruled,
            and Honda built machines that redefined what a 125 could be.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
