/**
 * Multiversa Tailwind Preset (CommonJS / Node-compatible)
 */

const colors = {
  titanium: {
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
  },
  violet: {
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
  },
  lavender: {
    DEFAULT: '#EDE9FE',
    50: '#F5F3FF',
    100: '#EDE9FE',
    accent: '#F5F3FF',
    subtle: '#EDE9FE',
    200: '#DDD6FE',
  },
  gold: {
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
  },
  slate: {
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
  },
};

const typography = {
  fontFamily: {
    sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
    serif: ['Newsreader', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    editorial: ['Newsreader', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    code: ['JetBrains Mono', 'monospace'],
  },
};

const multiversaPreset = {
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
          ink: colors.titanium.ink,
          surface: colors.titanium.surface,
          cosmic: colors.violet.cosmic,
          lavender: colors.lavender.accent,
          gold: colors.gold.semantic,
          border: colors.slate.borderDark,
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
        squircle: '1.75rem',
      },
      boxShadow: {
        'card-glow': '0 0 24px -4px rgba(109, 40, 217, 0.18)',
        'card-hover': '0 12px 32px -8px rgba(14, 20, 34, 0.45), 0 0 16px -2px rgba(109, 40, 217, 0.22)',
        'pill-glow': '0 0 12px -2px rgba(109, 40, 217, 0.3)',
        'gold-glow': '0 0 16px -2px rgba(217, 119, 6, 0.3)',
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

module.exports = multiversaPreset;
module.exports.default = multiversaPreset;
module.exports.multiversaPreset = multiversaPreset;
