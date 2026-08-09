import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * The clip is a YouTube Short, so the player is vertical (9:16) and capped to a
 * narrow column rather than stretched across the page.
 *
 * Nothing loads from YouTube until someone actually presses play: until then
 * this is a local still with a button over it, so readers who never watch pay
 * no download and hand over no data. The facade matches the player's aspect
 * ratio, so swapping one for the other doesn't shift the page.
 *
 * Deliberately the standard youtube.com embed domain rather than
 * youtube-nocookie.com: the privacy domain more readily serves YouTube's
 * "sign in to confirm you're not a bot" wall, which is worse for a visitor
 * than the cookie it avoids. The link below the player is the escape hatch
 * when YouTube blocks inline playback anyway, e.g. behind a VPN.
 */
const VIDEO_ID = 'iYM3gIppzAw';

/** A photo of the bike, not a frame from the clip — it sets up the play button. */
const POSTER = '/photos/finished/detail-engine-pipe.jpg';

export default function RunningVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Hear It Run
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Thirty-two years in a shop, and it still fires up.
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 340,
          mx: 'auto',
          aspectRatio: '9 / 16',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: '#000',
        }}
      >
        {playing ? (
          <Box
            component="iframe"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1`}
            title="1990 Honda CR125R running"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <Box
            component="button"
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play video of the bike running"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              p: 0,
              border: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(${POSTER}) center/cover`,
              '&:hover .play-badge, &:focus-visible .play-badge': {
                transform: 'scale(1.08)',
                bgcolor: '#e01010',
              },
            }}
          >
            <Box
              className="play-badge"
              sx={{
                width: 74,
                height: 74,
                borderRadius: '50%',
                bgcolor: 'rgba(204,0,0,0.92)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                transition: 'transform 0.2s ease, background-color 0.2s ease',
              }}
            >
              {/* Play triangle */}
              <Box
                sx={{
                  width: 0,
                  height: 0,
                  ml: '6px',
                  borderTop: '15px solid transparent',
                  borderBottom: '15px solid transparent',
                  borderLeft: '24px solid #fff',
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Typography variant="body2" sx={{ mt: 1.5, textAlign: 'center' }}>
        <Box
          component="a"
          href={`https://www.youtube.com/shorts/${VIDEO_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
        >
          Watch on YouTube ↗
        </Box>
      </Typography>
    </Box>
  );
}
