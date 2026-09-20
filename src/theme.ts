import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#d2fc86', contrastText: '#111310' },
    secondary: { main: '#bac8ff' },
    background: { default: '#111310', paper: '#1b1e19' },
    text: { primary: '#f3f5ef', secondary: '#a6ada0' },
    divider: '#353a30',
  },
  typography: {
    fontFamily: '"Segoe UI", Arial, sans-serif',
    h1: { fontWeight: 500, letterSpacing: '-0.075em', lineHeight: 1.02 },
    h2: { fontWeight: 500, letterSpacing: '-0.055em', lineHeight: 1.1 },
    h3: { fontWeight: 500, letterSpacing: '-0.045em', lineHeight: 1.15 },
    body1: { fontSize: '1.0625rem', lineHeight: 1.75 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
    button: { textTransform: 'none', fontWeight: 500, fontSize: '0.9375rem' },
    overline: { fontFamily: 'Consolas, monospace', fontSize: '.8125rem', letterSpacing: '.08em' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { borderRadius: 100, minHeight: 48, padding: '12px 24px' } } },
    MuiLink: { defaultProps: { underline: 'none' } },
    MuiCssBaseline: { styleOverrides: {
      html: { scrollBehavior: 'smooth', scrollPaddingTop: 100 },
      body: { margin: 0 },
      '::selection': { background: '#d2fc86', color: '#111310' },
      'a,button': { WebkitTapHighlightColor: 'transparent' },
      ':focus-visible': { outline: '2px solid #d2fc86', outlineOffset: 5 },
      '@media (prefers-reduced-motion: reduce)': { html: { scrollBehavior: 'auto' }, '*,*::before,*::after': { animation: 'none !important', transition: 'none !important' } },
    } },
  },
});
