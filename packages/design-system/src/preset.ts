import { colors } from './tokens/colors.js';
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

/**
 * Official Tailwind CSS Preset for Multiversa
 *
 * Consumption in tailwind.config.js / tailwind.config.ts:
 *
 * ```js
 * // ESM:
 * import { multiversaPreset } from '@multiversa/design-system/preset';
 * export default {
 *   presets: [multiversaPreset],
 *   content: ['./src/**\/*.{js,ts,jsx,tsx}']
 * };
 *
 * // CommonJS:
 * const multiversaPreset = require('@multiversa/design-system/preset');
 * module.exports = {
 *   presets: [multiversaPreset],
 *   content: ['./src/**\/*.{js,ts,jsx,tsx}']
 * };
 * ```
 */
export const multiversaPreset: TailwindConfigPreset = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        titanium: colors.titanium,
        violet: colors.violet,
        lavender: colors.lavender,
        gold: colors.gold,
        slate: colors.slate,
        brand: {
          ink: colors.titanium.ink,       // #0E1422
          surface: colors.titanium.surface, // #0F172A
          cosmic: colors.violet.cosmic,   // #6D28D9
          lavender: colors.lavender.accent, // #F5F3FF
          gold: colors.gold.semantic,     // #D97706
          border: colors.slate.borderDark, // #334155
        },
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
