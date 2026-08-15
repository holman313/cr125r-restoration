import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LeaveNote from './LeaveNote';
import RunningVideo from './RunningVideo';
import ThenAndNew from './ThenAndNew';

export default function MyStory() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom fontWeight={700}>
          My Story
        </Typography>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            At fourteen, my father surprised me with a 1990 Honda CR125 — the last one on the
            showroom floor as the '91s were coming in. Rolling it out of that showroom was
            life-changing. The trophies I won on it still sit on my shelf. So does the memory of
            breaking my collarbone at Washougal MX — first place, last lap, bad line over a double
            in what used to be the catcher's mitt after the Chuck Sun jump.
          </Typography>
          <Typography variant="body1" paragraph>
            I always told myself that if I ever came across another one in decent shape, I wouldn't
            let it go.
          </Typography>
          <Typography variant="body1" paragraph>
            That happened in July 2025. A low-hour, all-original CR125 showed up on Facebook
            Marketplace — a handful of rides on it before it sat in a shop for 32 years. The
            pictures were rough; it hadn't seen soap and water in a long time, and I couldn't tell
            what I was really looking at. We went back and forth on price. He turned down my final
            offer. The next day a message came in: "If you come get it today, you can have it." I
            told him I was on my way. Pulling up to that Honda orange in his driveway, walking
            around it and seeing how original it really was, I knew I'd gotten it for a steal. It
            fired on the first kick.
          </Typography>
          <Typography variant="body1" paragraph>
            The restoration was less overhaul than revival — sorting out the small things three
            decades of storage will do to a bike. Every hour on it brought something back.
          </Typography>
          <Typography variant="body1" paragraph>
            It made its public debut at the 125 Dream Race Show and Shine at Washougal MX, where
            Seth Enslow picked it as his bike of choice. Standing next to it that day — seeing how
            new it still looks, how cleanly it runs — is something I won't forget. This August it
            goes back to Washougal for the 15th Annual 125 Dream Race.
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            Some circles take thirty years to close.
          </Typography>
        </Paper>
        <ThenAndNew />
        <RunningVideo />
        <LeaveNote />
      </Container>
    </Box>
  );
}
