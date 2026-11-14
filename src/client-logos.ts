// These assets are client logos, not screenshots for the website gallery.
export const clientLogos = [
  { file: 'File 1.webp', name: 'The Injectionist & Aesthetics' },
  { file: 'File 2.webp', name: 'Client logo', light: true },
  { file: 'File 3.webp', name: 'Client logo' },
  { file: 'File 4.webp', name: 'Automaxx', light: true },
  { file: 'File 5.webp', name: 'Barbecues Galore', light: true },
  { file: 'File 6.webp', name: 'BW Law' },
  { file: 'File 7.webp', name: 'Curis' },
  { file: 'File 8.webp', name: 'Dunlap Law' },
  { file: 'File 10.webp', name: 'Calgary Farmyard' },
  { file: 'File 11.webp', name: 'Fratello' },
  { file: 'File 12.webp', name: 'Roofing', light: true },
  { file: 'File 13.webp', name: 'House of Cars' },
  { file: 'File 15.webp', name: 'Lavana Medical Aesthetics' },
  { file: 'File 16.webp', name: 'Tazscapes' },
  { file: 'File 17.webp', name: 'Inertia Hydrovac', light: true },
  { file: 'File 18.webp', name: 'Colz Electric', light: true },
  { file: 'File 19.webp', name: 'Elite Exteriors Pro', light: true },
  { file: 'File 20.webp', name: 'Force', light: true },
  { file: 'File 21.webp', name: 'Epic Restoration', light: true },
  { file: 'File 22.webp', name: 'MM Law', light: true },
  { file: 'File 23.webp', name: 'Client logo', light: true },
  { file: 'File 24.webp', name: 'Reborn Renovations' },
  { file: 'File 25.webp', name: 'Safety Bath', light: true },
  { file: 'File 26.webp', name: 'Client logo' },
] as const;

export const clientLogoFiles = new Set<string>(clientLogos.map(logo => logo.file));
