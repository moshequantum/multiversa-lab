/**
 * @multiversa/design-system
 *
 * The official canonical design system and brand assets for Multiversa.
 */

// Tokens
export * from './tokens/index.js';

// Canonical Brand SVGs & Paths
export * from './assets/svg.js';

// React Components
export * from './components/index.js';

// Tailwind Preset
export { multiversaPreset, default as preset } from './preset.js';
export type { TailwindConfigPreset } from './preset.js';
