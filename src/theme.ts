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
 * Opt-in "take me back to the 90s" mode. Draws its palette from the era's
 * motocross poster and MTV-parody aesthetic — red / royal blue / yellow on
 * cream, chunky compressed display type on headings — without reproducing
 * anyone's trademarked marks. The 125 Dream Race logo appears as a
 * standard event-attribution mark, not a decorative element.
 *
 * Impact is a system font on every mainstream OS, so no font loading needed
 * for the heading treatment.
 */
export const ninetiesTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#E9152A' },
    secondary: { main: '#0033A0' },
    error: { main: '#E9152A' },
    warning: { main: '#F2B90A' },
    background: {
      default: '#FBF3D8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#141414',
      secondary: '#3A3A3A',
    },
    divider: '#141414',
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
          border: '2px solid #141414',
          borderRadius: 6,
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
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#141414',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        outlined: {
          borderWidth: 2,
        },
      },
    },
  },
});

export function themeFor(mode: ThemeMode): Theme {
  return mode === 'nineties' ? ninetiesTheme : defaultTheme;
}
