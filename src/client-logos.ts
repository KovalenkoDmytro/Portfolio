// These assets are client logos, not screenshots for the website gallery.
export const clientLogos = [
  { file: 'File 1.png', name: 'The Injectionist & Aesthetics' },
  { file: 'File 2.svg', name: 'Client logo', light: true },
  { file: 'File 3.svg', name: 'Client logo' },
  { file: 'File 4.webp', name: 'Automaxx', light: true },
  { file: 'File 5.avif', name: 'Barbecues Galore', light: true },
  { file: 'File 6.webp', name: 'BW Law' },
  { file: 'File 7.png', name: 'Curis' },
  { file: 'File 8.png', name: 'Dunlap Law' },
  { file: 'File 10.avif', name: 'Calgary Farmyard' },
  { file: 'File 11.avif', name: 'Fratello' },
  { file: 'File 12.png', name: 'Roofing', light: true },
  { file: 'File 13.webp', name: 'House of Cars' },
  { file: 'File 15.webp', name: 'Lavana Medical Aesthetics' },
  { file: 'File 16.webp', name: 'Tazscapes' },
  { file: 'File 17.png', name: 'Inertia Hydrovac', light: true },
  { file: 'File 18.webp', name: 'Colz Electric', light: true },
  { file: 'File 19.webp', name: 'Elite Exteriors Pro', light: true },
  { file: 'File 20.png', name: 'Force', light: true },
  { file: 'File 21.png', name: 'Epic Restoration', light: true },
  { file: 'File 22.png', name: 'MM Law', light: true },
  { file: 'File 23.svg', name: 'Client logo', light: true },
  { file: 'File 24.webp', name: 'Reborn Renovations' },
  { file: 'File 25.webp', name: 'Safety Bath', light: true },
  { file: 'File 26.svg', name: 'Client logo' },
] as const;

export const clientLogoFiles = new Set<string>(clientLogos.map(logo => logo.file));
