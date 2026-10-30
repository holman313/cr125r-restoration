import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface PhotoButtonProps {
  onClick: () => void;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * Wraps a photo that opens the lightbox in a real <button>, so keyboard
 * users can Tab to it and open it with Enter or Space — a click handler on
 * the image or its container alone only works with a mouse or touch. The
 * button's accessible name comes from the image's alt text.
 *
 * Unstyled apart from a visible focus ring (only on keyboard focus, via
 * :focus-visible) and the existing hover fade.
 */
export default function PhotoButton({ onClick, children, sx }: PhotoButtonProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      sx={[
        {
          position: 'relative',
          display: 'block',
          width: '100%',
          height: '100%',
          p: 0,
          m: 0,
          border: 0,
          bgcolor: 'transparent',
          borderRadius: 1,
          cursor: 'pointer',
          '& img': { transition: 'opacity 0.2s' },
          '&:hover img': { opacity: 0.85 },
          // The focus ring is drawn *inside* the photo, on a layer above
          // it, rather than as an outline around it: the gallery grid clips
          // anything outside its own box, which cut an outer ring down to
          // one edge. A thin dark inner line keeps the red ring readable on
          // bright or red parts of a photo.
          '&:focus-visible': { outline: 'none' },
          '&:focus-visible::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            border: '3px solid',
            borderColor: 'error.light',
            borderRadius: 'inherit',
            boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.7)',
            pointerEvents: 'none',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
