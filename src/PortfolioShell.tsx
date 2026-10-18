'use client';

import type { ReactNode } from 'react';
import { LazyMotion } from 'motion/react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MotionPausedContext } from './motion';
import { ContactIntentProvider } from './contact-intent';

const loadMotionFeatures = async () => (await import('./motion-features')).features;

export const PortfolioShell = ({ children }: { children: ReactNode }) => {
  // Render visible content before hydration, including when JavaScript is disabled.
  const paused = useMediaQuery('(prefers-reduced-motion: reduce)', { defaultMatches: true });

  return (
    <ContactIntentProvider><LazyMotion features={loadMotionFeatures} strict>
      <MotionPausedContext.Provider value={paused}>
        <Box className={paused ? 'motion-paused' : ''} sx={{ overflow: 'clip', position: 'relative', isolation: 'isolate', bgcolor: 'background.default' }}>
          {children}
        </Box>
      </MotionPausedContext.Provider>
    </LazyMotion></ContactIntentProvider>
  );
};
