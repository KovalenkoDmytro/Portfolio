import { alpha, createTheme, lighten } from '@mui/material/styles';
import { colors } from './colors';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.green, contrastText: colors.graphite },
    secondary: { main: colors.white, contrastText: colors.graphite },
    background: { default: colors.graphite, paper: lighten(colors.graphite, .04) },
    text: { primary: colors.white, secondary: alpha(colors.white, .7) },
    divider: alpha(colors.white, .16),
  },
  typography: {
    fontFamily: '"Segoe UI Variable", "Segoe UI", Arial, sans-serif',
    h1: { fontWeight: 500, letterSpacing: '-0.075em', lineHeight: 1.02 },
    h2: { fontWeight: 500, fontSize: 'clamp(2.25rem, 4.6vw, 3.7rem)', letterSpacing: '-0.045em', lineHeight: 1.12 },
    h3: { fontWeight: 500, letterSpacing: '-0.045em', lineHeight: 1.15 },
    body1: { fontSize: '1.0625rem', lineHeight: 1.75 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
    button: { textTransform: 'none', fontWeight: 500, fontSize: '0.9375rem' },
    overline: { fontFamily: 'Consolas, monospace', fontSize: '.8125rem', letterSpacing: '.08em' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiContainer: { defaultProps: { maxWidth: false }, styleOverrides: { root: { maxWidth: 1760 } } },
    MuiButton: {
      defaultProps: { disableElevation: true, variant: 'outlined' },
      styleOverrides: {
        root: { borderRadius: 100, minHeight: 48, padding: '12px 24px', fontWeight: 600 },
        outlined: { borderWidth: 1, borderColor: 'currentColor', '&:hover': { borderColor: 'currentColor' } },
      },
    },
    MuiIconButton: { styleOverrides: { root: ({ theme }) => ({ minWidth: 44, minHeight: 44, border: `1px solid ${alpha(theme.palette.text.primary, .5)}`, backgroundColor: alpha(theme.palette.text.primary, .05), '&.Mui-disabled': { borderColor: theme.palette.divider, backgroundColor: 'transparent' } }) } },
    MuiLink: { defaultProps: { underline: 'always' }, styleOverrides: { root: { textUnderlineOffset: '4px' } } },
    MuiCssBaseline: { styleOverrides: {
      html: { scrollBehavior: 'smooth', scrollPaddingTop: 130 },
      body: { margin: 0 },
      '::selection': { background: colors.green, color: colors.graphite },
      'a,button': { WebkitTapHighlightColor: 'transparent' },
      ':focus-visible': { outline: `2px solid ${colors.green}`, outlineOffset: 5 },
      '@media (prefers-reduced-motion: reduce)': { html: { scrollBehavior: 'auto' }, '*,*::before,*::after': { animation: 'none !important', transition: 'none !important' } },
    } },
  },
});
