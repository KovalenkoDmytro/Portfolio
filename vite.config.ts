import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: { dedupe: ['react', 'react-dom'] },
  // Scan the app entry, not downloaded Stitch reference HTML.
  optimizeDeps: {
    entries: ['index.html'],
    include: ['react', 'react-dom/client', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  },
  server: { strictPort: true },
});
