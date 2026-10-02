/**
 * Multiversa Design System Color Tokens
 *
 * Titanium Ink (#0E1422 / #0F172A)
 * Cosmic Violet (#6D28D9)
 * Lavender Accent (#F5F3FF / #EDE9FE)
 * Semantic Gold (#D97706)
 * Slate & Borders (#334155, #64748B, #E2E8F0)
 *
 * STRICT BRAND INVARIANT:
 * NO Chartreuse. Legacy chartreuse / neon green is strictly forbidden.
 */

export const titanium = {
  DEFAULT: '#0E1422',
  ink: '#0E1422',
  surface: '#0F172A',
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#0F172A',
  900: '#0E1422',
  950: '#070A11',
} as const;

export const violet = {
  DEFAULT: '#6D28D9',
  cosmic: '#6D28D9',
  50: '#F5F3FF',
  100: '#EDE9FE',
  200: '#DDD6FE',
  300: '#C4B5FD',
  400: '#A78BFA',
  500: '#8B5CF6',
  600: '#7C3AED',
  700: '#6D28D9',
  800: '#5B21B6',
  900: '#4C1D95',
} as const;

export const lavender = {
  DEFAULT: '#EDE9FE',
  50: '#F5F3FF',
  100: '#EDE9FE',
  accent: '#F5F3FF',
  subtle: '#EDE9FE',
  200: '#DDD6FE',
} as const;

export const gold = {
  DEFAULT: '#D97706',
  semantic: '#D97706',
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B',
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
} as const;

export const slate = {
  DEFAULT: '#64748B',
  border: '#E2E8F0',
  borderDark: '#334155',
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
} as const;

export const borders = {
  light: '#E2E8F0',
  DEFAULT: '#334155',
  dark: '#334155',
  subtle: 'rgba(226, 232, 240, 0.1)',
  glow: 'rgba(109, 40, 217, 0.35)',
} as const;

export const statusColors = {
  production: {
    dot: '#10B981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.25)',
    text: '#34D399',
  },
  operating: {
    dot: '#6D28D9',
    bg: 'rgba(109, 40, 217, 0.10)',
    border: 'rgba(109, 40, 217, 0.35)',
    text: '#A78BFA',
  },
  standard: {
    dot: '#64748B',
    bg: 'rgba(100, 116, 139, 0.08)',
    border: 'rgba(100, 116, 139, 0.25)',
    text: '#94A3B8',
  },
  delivers: {
    dot: '#D97706',
    bg: 'rgba(217, 119, 6, 0.10)',
    border: 'rgba(217, 119, 6, 0.35)',
    text: '#FBBF24',
  },
} as const;

export const colors = {
  titanium,
  violet,
  lavender,
  gold,
  slate,
  borders,
  status: statusColors,
  brand: {
    ink: titanium.ink,
    surface: titanium.surface,
    cosmic: violet.cosmic,
    lavender: lavender.accent,
    gold: gold.semantic,
    border: slate.borderDark,
  },
} as const;

export type Colors = typeof colors;
