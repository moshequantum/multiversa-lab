import { typography } from './tokens/typography.js';
import { radii, shadows } from './tokens/spacing.js';

export interface TailwindConfigPreset {
  darkMode?: 'class' | 'media';
  theme: {
    extend: {
      colors: Record<string, any>;
      fontFamily: Record<string, readonly string[] | string[]>;
      borderRadius?: Record<string, string>;
      boxShadow?: Record<string, string>;
      keyframes?: Record<string, any>;
      animation?: Record<string, string>;
    };
  };
}

/** Tailwind color that reads a tokens.css channel, so opacity modifiers work (bg-primary/10). */
const ok = (name: string) => `oklch(var(--${name}) / <alpha-value>)`;

/**
 * Official Tailwind CSS preset for Multiversa — Cosmic Night.
 *
 * Colors are CSS variables, so load the tokens once (`@multiversa/design-system/tokens.css`)
 * and the preset maps them to the same utility names both sites use (bg-canvas, text-ivory,
 * text-muted, border-border, bg-primary/10…).
 *
 * ```js
 * // ESM (built package):
 * import { multiversaPreset } from '@multiversa/design-system/preset';
 * // CommonJS / any config without a build step:
 * const multiversaPreset = require('@multiversa/design-system/preset');
 *
 * export default { presets: [multiversaPreset], content: ['./src/**\/*.{js,ts,jsx,tsx}'] };
 * ```
 */
export const multiversaPreset: TailwindConfigPreset = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cosmic Night semantic tokens (same names as the Group site)
        background: ok('background'),
        foreground: ok('foreground'),
        border: ok('border'),
        input: ok('input'),
        ring: ok('ring'),
        'muted-fg': ok('muted-foreground'),

        canvas: ok('background'),
        void: ok('background'),
        surface: ok('card'),
        card: ok('card'),
        'card-hover': ok('card-hover'),

        primary: ok('primary'),
        'primary-hover': ok('primary-hover'),
        secondary: ok('secondary-foreground'),
        accent: ok('primary'),
        alternative: ok('alternative'),
        gold: ok('alternative'),
        destructive: ok('destructive'),

        // Typographic tones
        ivory: ok('foreground'),
        copy: ok('foreground'),
        sand: ok('muted-foreground'),
        muted: ok('muted-foreground'),
      },
      fontFamily: {
        sans: typography.fontFamily.sans,
        display: typography.fontFamily.display,
        serif: typography.fontFamily.serif,
        editorial: typography.fontFamily.editorial,
        mono: typography.fontFamily.mono,
        code: typography.fontFamily.code,
      },
      borderRadius: {
        pill: radii.full,
        squircle: radii.squircle,
      },
      boxShadow: {
        'card-glow': shadows['card-glow'],
        'card-hover': shadows['card-hover'],
        'pill-glow': shadows['pill-glow'],
        'gold-glow': shadows['gold-glow'],
      },
      keyframes: {
        'multiversa-ping': {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
      },
      animation: {
        'multiversa-ping': 'multiversa-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
};

export default multiversaPreset;
