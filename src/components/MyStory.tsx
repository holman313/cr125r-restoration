import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function MyStory() {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom fontWeight={700}>
          My Story
        </Typography>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            At fourteen, I raced a 1990 Honda CR125 — a machine that didn't just introduce me to
            motocross, it defined my early years in the sport. The trophies I won on that bike still
            sit on my shelf, and for decades I carried a quiet promise to myself: if I ever found
            one in decent shape, I wouldn't let it pass.
          </Typography>
          <Typography variant="body1" paragraph>
            That moment came in July 2025. A remarkably low-hour one surfaced on Facebook
            Marketplace — all original, with just a handful of rides on it before being stored in a
            shop for over 32 years. It came home with me that same day. True to its reputation, it
            fired on the first kick.
          </Typography>
          <Typography variant="body1" paragraph>
            The restoration was less of an overhaul and more of a careful revival — addressing the
            small things that inevitably suffer after three decades of storage. Every hour spent on
            it brought back a flood of memories, and watching it come back to life was a reward in
            itself.
          </Typography>
          <Typography variant="body1" paragraph>
            The bike made its public debut at the 125 Dream Race Show and Shine at Washougal MX,
            where it was selected by Seth Enslow as his bike of choice. Standing next to it that
            day, seeing how well it had held up — how new it still looks, how cleanly it runs —
            was something I won't forget.
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            Some things are worth waiting thirty years for.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
