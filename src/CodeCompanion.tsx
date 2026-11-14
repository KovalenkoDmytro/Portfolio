import Box from '@mui/material/Box';

// Decorative only: the actual introduction and navigation remain plain HTML.
export const CodeCompanion = () => (
  <Box aria-hidden="true" sx={{ mt: { xs: 4, md: 5 }, maxWidth: 430, display: 'flex', alignItems: 'center', gap: 2, pointerEvents: 'none', userSelect: 'none', '@keyframes companion-bob': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } }, '@keyframes code-drift': { '0%, 100%': { transform: 'translateX(0)' }, '50%': { transform: 'translateX(10px)' } }, '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } } }}>
    <Box sx={{ flexShrink: 0, width: 42, height: 42, display: 'grid', placeItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1.5, color: 'primary.main', bgcolor: 'background.paper', animation: 'companion-bob 4s ease-in-out infinite' }}>
      <Box component="svg" viewBox="0 0 32 32" fill="none" sx={{ width: 29, height: 29 }}>
        <path d="M16 5v3m-7 2h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Zm1 14v3m12-3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.3" fill="currentColor" /><circle cx="20" cy="16" r="1.3" fill="currentColor" /><path d="M13 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </Box>
    </Box>
    <Box sx={{ minWidth: 0, overflow: 'hidden', borderLeft: 1, borderColor: 'divider', pl: 2, fontFamily: 'Consolas, monospace', fontSize: '.72rem', lineHeight: 1.7, color: 'text.secondary' }}>
      <Box sx={{ whiteSpace: 'nowrap', animation: 'code-drift 8s ease-in-out infinite' }}><Box component="span" sx={{ color: 'primary.main' }}>const</Box> idea = <Box component="span" sx={{ color: 'text.primary' }}>build</Box>(<Box component="span" sx={{ color: 'primary.main' }}>"something useful"</Box>);</Box>
      <Box sx={{ whiteSpace: 'nowrap', opacity: .65, animation: 'code-drift 10s ease-in-out infinite reverse' }}>// thoughtful ideas, working software</Box>
    </Box>
  </Box>
);
