import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function OriginalListing() {
  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Divider sx={{ mb: 6 }} />
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Original Listing
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 4 }}>
          Facebook Marketplace — July 2025
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: { xs: 'stretch', md: 'flex-start' },
          }}
        >
          {/* Screenshot */}
          <Box
            component="img"
            src="/photos/as-found/Screenshot%202025-10-10%20105721.png"
            alt="Original Facebook Marketplace listing"
            sx={{
              width: { xs: '100%', md: '40%' },
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              objectFit: 'contain',
            }}
          />

          {/* Typed text */}
          <Paper
            variant="outlined"
            sx={{
              flex: 1,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="overline" color="error.main" fontWeight={700} letterSpacing={2}>
              Seller's Description
            </Typography>
            <Typography variant="body1">
              1990 Honda CR125R low hours, original tires. Original owner rode it three times and
              dented the exhaust pipe and put it away in the barn for 30 years. I popped the dent
              out with a torch and air pressure.
            </Typography>
            <Typography variant="body1">
              Clean title. Aftermarket muffler with spark arrestor. Hand guards. First year of
              upside-down forks, HPP head. 37.5 HP.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
