import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '40vh', md: '55vh' },
        overflow: 'hidden',
      }}
    >
      {/* Background photo */}
      <Box
        component="img"
        src="/photos/finished/banner.jpg"
        alt="1990 Honda CR125R"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Red gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(180,0,0,0.75) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.2) 100%)',
        }}
      />

      {/* Text */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, md: 8 },
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'rgba(255,255,255,0.75)', letterSpacing: 4, mb: 1 }}
        >
          Classic Restoration
        </Typography>
        <Typography
          fontWeight={800}
          sx={{
            color: '#fff',
            lineHeight: 1.1,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            fontSize: { xs: '2.2rem', sm: '3rem', md: '3.75rem' },
          }}
        >
          1990 Honda
          <br />
          CR125R
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.7)',
            mt: 2,
            fontWeight: 400,
            fontSize: { xs: '0.85rem', sm: '1rem', md: '1.25rem' },
          }}
        >
          125cc · Two-Stroke · Honda Power Port
        </Typography>
      </Box>
    </Box>
  );
}
