# Dmytro Kovalenko — Portfolio

A responsive React + TypeScript + MUI portfolio with Anime.js and Motion for React.

## Development

```sh
pnpm install
pnpm dev
```

If pnpm is not installed, use `npx --yes pnpm` in its place. npm is also supported with a synchronized package lock.

## Validation

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Production files are written to `dist/`. This static portfolio needs no PHP backend or database.

## Design and interaction

The original charcoal, lime and lavender palette is restored. The redesign uses a Stitch-generated workstation reference, adapted to the existing content and MUI theme.

- Anime.js drives a computer monitor with typewriter code, cursor blink, sequential terminal output, floating motion, keyboard highlights and rotating orbital rings.
- Switch between `Portfolio.tsx` and `api.php`; the code and terminal presentation loop continuously. The terminal is an illustrative animation; it does not execute code or contact an API.
- Motion for React handles scroll reveals, button feedback and project-panel transitions.
- Motion runs automatically. The system reduced-motion preference immediately shows complete code and disables decorative movement; language switching remains available.
- Animations stop outside the viewport; scopes and observers are cleaned up on unmount.
- Existing project panels, links and contact information are preserved.

Stitch project: https://stitch.withgoogle.com/projects/16486726980484093004
Reference screenshot and HTML: `.stitch/designs/`. Exact palette, layout and motion rules: `.stitch/DESIGN.md`.
Generated sample metrics, contact details and experience claims were excluded from the implementation.

## Editing

- Profile and experience: `src/content.ts`
- Layout: `src/App.tsx`
- Hero layout: `src/KineticHero.tsx`
- Animated computer and code examples: `src/CodingComputer.tsx`
- Motion reveals: `src/components.tsx`
- Project panels: `src/ProjectVisuals.tsx`
- Colors and typography: `src/theme.ts`
- Resume: `public/Dmytro-Kovalenko-Resume.pdf`

The portfolio preserves the existing profile, experience, and project descriptions. The colored project panels are interactive workflow diagrams, not product screenshots.

Library references: [Anime.js React integration](https://animejs.com/documentation/getting-started/using-with-react/) and [Motion for React](https://motion.dev/docs/react).

## Verification

Lint, TypeScript, server-rendered navigation/accessibility tests, and the production build are checked. Browser-based visual and interaction checks still need to be performed; no browser connection was available in the implementation session.
