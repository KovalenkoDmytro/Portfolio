import { useEffect, useRef, useState } from 'react';
import { animate, createScope, createTimeline, stagger } from 'animejs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Terminal from '@mui/icons-material/Terminal';
import Code from '@mui/icons-material/Code';
import { useMotionPaused } from './motion';

type Language = 'frontend' | 'backend';
const examples: Record<Language, { file: string; lines: readonly string[]; output: readonly string[] }> = {
  frontend: {
    file: 'Portfolio.tsx',
    lines: [
      '// From an idea to an experience.',
      'type Developer = {',
      '  name: string;',
      '  stack: string[];',
      '};',
      '',
      'const developer: Developer = {',
      '  name: "Dmytro Kovalenko",',
      '  stack: ["React", "TypeScript"],',
      '};',
      '',
      'export const App = () => (',
      '  <Experience {...developer} />',
      ');',
    ],
    output: ['> preview Portfolio.tsx', '✓ Component rendered', '✓ Thoughtful details included'],
  },
  backend: {
    file: 'api.php',
    lines: [
      '<?php',
      'declare(strict_types=1);',
      '',
      'use Illuminate\\Support\\Facades\\Route;',
      '',
      '// Give every idea a solid foundation.',
      "Route::get('/projects', function () {",
      '    return response()->json([',
      "        'developer' => 'Dmytro',",
      "        'stack' => 'Laravel',",
      "        'projects' => ['EstateHub', 'ARC'],",
      '    ]);',
      '});',
      '',
    ],
    output: ['> preview GET /projects', '✓ Route registered', '✓ Example response ready'],
  },
};

const Workstation = styled('div')(({ theme }) => ({
  position: 'relative', padding: theme.spacing(5, 0, 2), perspective: 1200,
  '& .orbital': { position: 'absolute', width: '114%', height: '100%', left: '-7%', top: '-9%', color: alpha(theme.palette.primary.main, .25), pointerEvents: 'none' },
  '& .computer-float': { position: 'relative' },
  '& .monitor': { position: 'relative', background: theme.palette.background.default, border: `1px solid ${theme.palette.divider}`, padding: theme.spacing(1), borderRadius: 18, boxShadow: `0 32px 70px ${alpha(theme.palette.common.black, .45)}, 0 0 65px ${alpha(theme.palette.primary.main, .045)}`, transform: 'rotateY(-7deg) rotateX(3deg)' },
  '& .editor': { overflow: 'hidden', borderRadius: 10, border: `1px solid ${theme.palette.divider}`, background: theme.palette.background.paper },
  '& .code-body': { padding: theme.spacing(2, 0), margin: 0, fontFamily: 'Consolas, monospace', fontSize: 'clamp(10px, 1vw, 13px)', lineHeight: 1.85, minHeight: 330, overflowX: 'auto' },
  '& .code-line': { display: 'flex', whiteSpace: 'pre', paddingRight: theme.spacing(2) },
  '& .line-number': { flex: '0 0 38px', textAlign: 'right', marginRight: theme.spacing(2), color: theme.palette.text.secondary, userSelect: 'none' },
  '& .code-comment': { color: theme.palette.text.secondary },
  '& .code-keyword': { color: theme.palette.secondary.main },
  '& .code-string': { color: theme.palette.primary.main },
  '& .code-char': { display: 'inline' },
  '& .cursor': { display: 'inline-block', width: 7, height: 13, marginLeft: theme.spacing(.5), background: theme.palette.primary.main, verticalAlign: 'middle' },
  '& .stand': { width: 90, height: 42, margin: '0 auto', background: theme.palette.background.paper, borderLeft: `1px solid ${theme.palette.divider}`, borderRight: `1px solid ${theme.palette.divider}`, clipPath: 'polygon(16% 0, 84% 0, 100% 100%, 0 100%)' },
  '& .stand-base': { width: '40%', height: 9, margin: '0 auto', background: theme.palette.divider, borderRadius: '50% 50% 3px 3px' },
  '& .keyboard': { width: '65%', margin: theme.spacing(2, 'auto', 0), display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 3, transform: 'perspective(180px) rotateX(30deg)', padding: theme.spacing(1), border: `1px solid ${theme.palette.divider}`, borderRadius: 8, background: theme.palette.background.paper },
  '& .key': { height: 8, borderRadius: 2, background: theme.palette.divider },
  [theme.breakpoints.down('md')]: { maxWidth: 620, margin: '0 auto', '& .monitor': { transform: 'none' }, '& .code-body': { fontSize: 12 } },
  [theme.breakpoints.down('sm')]: { '& .code-body': { fontSize: 10, minHeight: 285 }, '& .line-number': { flexBasis: 24, marginRight: theme.spacing(1) } },
}));

const tokenize = (line: string) => line.split(/("[^"]*"|'[^']*'|\/\/.*$|\b(?:type|const|export|return|use|function|declare|string|strict_types)\b)/g);
const keyIds = Array.from({ length: 42 }, (_, index) => `key-${index}`);

export const CodingComputer = () => {
  const root = useRef<HTMLDivElement>(null);
  const paused = useMotionPaused();
  const [language, setLanguage] = useState<Language>('frontend');
  const example = examples[language];

  useEffect(() => {
    if (paused) return;
    const animations: Array<ReturnType<typeof animate> | ReturnType<typeof createTimeline>> = [];
    const scope = createScope({ root }).add(() => {
      const timeline = createTimeline({ loop: true, loopDelay: 1800 });
      timeline.add('.code-char', { opacity: [0, 1], duration: 1, delay: stagger(13) });
      timeline.add('.terminal-line', { opacity: [0, 1], y: [5, 0], duration: 250, delay: stagger(400) }, '+=200');
      animations.push(timeline);
      animations.push(animate('.cursor', { opacity: [1, 0], duration: 550, alternate: true, loop: true, ease: 'steps(1)' }));
      animations.push(animate('.computer-float', { y: [0, -7], duration: 4200, alternate: true, loop: true, ease: 'inOutSine' }));
      animations.push(animate('.orbital', { rotate: [0, 360], duration: 50000, loop: true, ease: 'linear' }));
      animations.push(animate('.key', { opacity: [.35, 1], duration: 450, delay: stagger(70, { from: 'center' }), alternate: true, loop: true, ease: 'inOutSine' }));
    });
    const observer = new IntersectionObserver(([entry]) => {
      animations.forEach(animation => { if (entry.isIntersecting) animation.resume(); else animation.pause(); });
    });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); scope.revert(); };
  }, [language, paused]);

  return <Box component="figure" sx={{ m: 0, minWidth: 0 }}>
    <Workstation ref={root}>
      <svg className="orbital" aria-hidden="true" viewBox="0 0 600 600" fill="none" stroke="currentColor">
        <circle cx="300" cy="300" r="258" strokeDasharray="3 10" />
        <ellipse cx="300" cy="300" rx="262" ry="110" transform="rotate(-32 300 300)" />
        <ellipse cx="300" cy="300" rx="262" ry="110" transform="rotate(48 300 300)" />
        <circle cx="100" cy="135" r="5" fill="currentColor" />
      </svg>
      <Box className="computer-float">
        <Box className="monitor">
          <Box className="editor">
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
              <Stack direction="row" gap={.75} aria-hidden="true">{['primary.main', 'secondary.main', 'text.secondary'].map(color => <Box key={color} sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color, opacity: .75 }} />)}</Stack>
              <Typography variant="overline" color="text.secondary" sx={{ fontSize: 10 }}>dmytro / workspace</Typography><Code sx={{ fontSize: 17, color: 'text.secondary' }} />
            </Stack>
            <Stack direction="row" role="group" aria-label="Code examples" sx={{ borderBottom: 1, borderColor: 'divider' }}>
              {(Object.keys(examples) as Language[]).map(item => <Button key={item} onClick={() => setLanguage(item)} aria-pressed={language === item} color="inherit" sx={{ borderRadius: 0, px: 2, fontFamily: 'Consolas, monospace', fontSize: 12, minHeight: 44, color: language === item ? 'primary.main' : 'text.secondary', borderBottom: 2, borderColor: language === item ? 'primary.main' : 'transparent' }}>{examples[item].file}</Button>)}
            </Stack>
            <Box role="img" aria-label={`${example.file}: illustrative ${language === 'frontend' ? 'React and TypeScript component' : 'Laravel API route'} code`}>
              <Box component="pre" className="code-body" aria-hidden="true"><code>{example.lines.map((line, lineIndex) => <span className="code-line" key={`${language}-line-${lineIndex}`}><span className="line-number">{String(lineIndex + 1).padStart(2, '0')}</span><span>{tokenize(line).map((token, tokenIndex) => <span key={`${lineIndex}-token-${tokenIndex}`} className={token.startsWith('//') ? 'code-comment' : /^["']/.test(token) ? 'code-string' : /^(type|const|export|return|use|function|declare|string|strict_types)$/.test(token) ? 'code-keyword' : undefined}>{Array.from(token).map((character, charIndex) => <span className="code-char" key={`${lineIndex}-${tokenIndex}-${charIndex}`}>{character}</span>)}</span>)}{lineIndex === example.lines.length - 1 ? <span className="cursor" /> : null}</span></span>)}</code></Box>
            </Box>
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
              <Stack direction="row" gap={1} alignItems="center" sx={{ mb: 1 }}><Terminal sx={{ fontSize: 15, color: 'text.secondary' }} /><Typography variant="overline" color="text.secondary" sx={{ fontSize: 10 }}>Terminal · illustrative preview</Typography></Stack>
              <Box aria-hidden="true" sx={{ minHeight: 66, fontFamily: 'Consolas, monospace', fontSize: { xs: 11, md: 12 }, lineHeight: 1.8 }}>{example.output.map(line => <Box className="terminal-line" key={line} sx={{ color: line.startsWith('✓') ? 'primary.main' : 'text.secondary' }}>{line}</Box>)}</Box>
            </Box>
          </Box>
        </Box>
        <div className="stand" aria-hidden="true" /><div className="stand-base" aria-hidden="true" />
        <div className="keyboard" aria-hidden="true">{keyIds.map(id => <span className="key" key={id} />)}</div>
      </Box>
    </Workstation>
    <Typography component="figcaption" variant="overline" color="text.secondary" sx={{ display: 'block', mt: 1, fontSize: 10 }}>01 / From the first line to the final detail · illustrative build loop</Typography>
  </Box>;
};
