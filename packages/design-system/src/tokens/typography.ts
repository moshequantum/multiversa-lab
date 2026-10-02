/**
 * Multiversa Design System Typography Tokens
 *
 * Display / Sans: 'Plus Jakarta Sans'
 * Editorial / Serif: 'Newsreader'
 * Monospace / Code: 'JetBrains Mono'
 */

export const typography = {
  fontFamily: {
    sans: [
      'Plus Jakarta Sans',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ],
    display: [
      'Plus Jakarta Sans',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'sans-serif',
    ],
    serif: [
      'Newsreader',
      'Georgia',
      'Cambria',
      'Times New Roman',
      'Times',
      'serif',
    ],
    editorial: [
      'Newsreader',
      'Georgia',
      'serif',
    ],
    mono: [
      'JetBrains Mono',
      'ui-monospace',
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'monospace',
    ],
    code: [
      'JetBrains Mono',
      'monospace',
    ],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.015em' }],
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
    '5xl': ['3rem', { lineHeight: '1.16', letterSpacing: '-0.035em' }],
    '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;

export type Typography = typeof typography;
