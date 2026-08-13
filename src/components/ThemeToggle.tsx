import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { ThemeMode } from '../theme';

interface Props {
  mode: ThemeMode;
  onToggle: () => void;
}

/**
 * The "take me back to the 90s" chip that lives at the right edge of the
 * nav bar. Full label on desktop, ultra-compact on mobile so the tabs still
 * fit without a scroll arrow. Copy describes what the click will do next,
 * not what's active — so a visitor never has to guess whether the button
 * shows current state or target state.
 */
export default function ThemeToggle({ mode, onToggle }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const goingBack = mode === 'default';
  const fullLabel = goingBack ? 'Take me back to the 90s' : 'Return to the present';
  const shortLabel = goingBack ? '↩ 90s Mode' : '↩ Present Day';
  const tinyLabel = goingBack ? '90s' : 'Now';

  return (
    <Button
      onClick={onToggle}
      size="small"
      variant="text"
      sx={{
        color: 'inherit',
        fontWeight: 700,
        textTransform: 'none',
        whiteSpace: 'nowrap',
        fontSize: { xs: '0.7rem', sm: '0.75rem' },
        opacity: 0.9,
        px: { xs: 0.75, sm: 1.5 },
        minWidth: 0,
        alignSelf: 'center',
        flexShrink: 0,
        '&:hover': { opacity: 1 },
      }}
      aria-pressed={mode === 'nineties'}
      aria-label={fullLabel}
    >
      <Box component="span">{isMobile ? tinyLabel : shortLabel}</Box>
    </Button>
  );
}
