/**
 * Multiversa Design System Spacing, Shadows, Radii & Motion
 */

export const radii = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  squircle: '1.75rem', // 28px authentic squircle radius
  full: '9999px',
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  'card-glow': '0 0 24px -4px rgba(109, 40, 217, 0.15)',
  'card-hover': '0 12px 32px -8px rgba(14, 20, 34, 0.45), 0 0 16px -2px rgba(109, 40, 217, 0.22)',
  'pill-glow': '0 0 12px -2px rgba(109, 40, 217, 0.3)',
  'gold-glow': '0 0 16px -2px rgba(217, 119, 6, 0.3)',
} as const;

export const transitions = {
  default: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  smooth: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
  spring: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
