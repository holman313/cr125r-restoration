import { createTheme, type Theme } from '@mui/material/styles';

export type ThemeMode = 'default' | 'nineties';

/**
 * The site's normal presentation — dark, restrained, Honda-red primary.
 * This is what a judge sees, and what the site defaults to for every visitor
 * who doesn't opt into 90s mode.
 */
export const defaultTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#cc0000' },
    error: { main: '#cc0000' },
    background: {
      default: '#111111',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

/**
 * "Take me back to the 90s" mode — loud, saturated, unashamedly poster.
 *
 * Background is the exact bright poster yellow from the 125 DR mark, and
 * cards float on top in white with a heavy black border and a chunky
 * offset shadow — the punk-sticker/silkscreen effect that reads instantly
 * as period. Palette is drawn from the same poster: red / royal blue /
 * yellow on black outlines. No trademarked marks are reproduced.
 *
 * Impact is a system font on every mainstream OS, so no font loading is
 * needed for the heading treatment.
 */
export const ninetiesTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#EA1B2C' },
    secondary: { main: '#0033A0' },
    error: { main: '#EA1B2C' },
    warning: { main: '#0033A0' },
    info: { main: '#0033A0' },
    background: {
      default: '#FFED00',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0B0B0B',
      secondary: '#2A2A2A',
    },
    divider: '#0B0B0B',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontFamily: '"Impact", "Haettenschweiler", "Franklin Gothic Bold", "Arial Black", sans-serif',
      fontWeight: 900,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
    h5: {
      fontFamily: '"Impact", "Haettenschweiler", "Franklin Gothic Bold", "Arial Black", sans-serif',
      fontWeight: 900,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
    h6: {
      fontFamily: '"Impact", "Haettenschweiler", "Franklin Gothic Bold", "Arial Black", sans-serif',
      fontWeight: 900,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
    overline: {
      fontWeight: 900,
      letterSpacing: '0.15em',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '3px solid #0B0B0B',
          borderRadius: 6,
          boxShadow: '6px 6px 0 #0B0B0B',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
          border: '3px solid #0B0B0B',
          borderRadius: 6,
          boxShadow: '6px 6px 0 #0B0B0B',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily:
            '"Impact", "Haettenschweiler", "Franklin Gothic Bold", "Arial Black", sans-serif',
          fontWeight: 900,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        },
        contained: {
          border: '2px solid #0B0B0B',
          boxShadow: '4px 4px 0 #0B0B0B',
          '&:hover': { boxShadow: '4px 4px 0 #0B0B0B' },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': { borderWidth: 2 },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0B0B0B',
          borderBottom: '3px solid #FFED00',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        outlined: {
          borderWidth: 3,
          fontWeight: 700,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': { borderWidth: 2, borderColor: '#0B0B0B' },
        },
      },
    },
  },
});

export function themeFor(mode: ThemeMode): Theme {
  return mode === 'nineties' ? ninetiesTheme : defaultTheme;
}
