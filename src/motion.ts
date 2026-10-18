'use client';

import { createContext, useContext } from 'react';

export const MotionPausedContext = createContext(false);
export const useMotionPaused = () => useContext(MotionPausedContext);
