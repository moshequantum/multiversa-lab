import type { HTMLAttributes, ReactNode } from 'react';
import { colors } from '../tokens/colors.js';

export type DesignCardVariant =
  | 'default'
  | 'glow'
  | 'interactive'
  | 'ghost'
  | 'flat';

export type DesignCardAccent = 'violet' | 'gold' | 'slate' | 'none';

export interface DesignCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Visual display variant */
  variant?: DesignCardVariant;

  /** Glow / border accent color highlight */
  accent?: DesignCardAccent;

  /** Card title */
  title?: ReactNode;

  /** Card subtitle or secondary description */
  subtitle?: ReactNode;

  /** Optional badge in top-right slot (e.g. StatusPill) */
  badge?: ReactNode;

  /** Optional leading icon in header */
  icon?: ReactNode;

  /** Optional footer content */
  footer?: ReactNode;

  /** Card body content */
  children?: ReactNode;

  className?: string;
}

const accentBorderMap: Record<DesignCardAccent, string> = {
  violet: 'rgba(109, 40, 217, 0.35)',
  gold: 'rgba(217, 119, 6, 0.35)',
  slate: colors.slate.borderDark, // #334155
  none: 'rgba(226, 232, 240, 0.08)',
};

const accentGlowMap: Record<DesignCardAccent, string> = {
  violet: '0 0 24px -4px rgba(109, 40, 217, 0.18)',
  gold: '0 0 24px -4px rgba(217, 119, 6, 0.18)',
  slate: '0 0 20px -4px rgba(100, 116, 139, 0.15)',
  none: 'none',
};

/**
 * DesignCard
 *
 * Clean architectural card component matching the Multiversa titanium & cosmic aesthetic.
 * Incorporates subtle border illumination, high-craft typography, and responsive micro-elevations.
 */
export function DesignCard({
  variant = 'default',
  accent = 'none',
  title,
  subtitle,
  badge,
  icon,
  footer,
  children,
  className = '',
  style,
  ...props
}: DesignCardProps) {
  const isInteractive = variant === 'interactive' || Boolean(props.onClick);
  const isGhost = variant === 'ghost';
  const isGlow = variant === 'glow';

  const baseBg = isGhost
    ? 'transparent'
    : variant === 'flat'
    ? colors.titanium.ink
    : colors.titanium.surface; // #0F172A

  const borderColor = isGlow || accent !== 'none'
    ? accentBorderMap[accent === 'none' ? 'violet' : accent]
    : colors.borders.subtle;

  const boxShadow = isGlow
    ? accentGlowMap[accent === 'none' ? 'violet' : accent]
    : '0 4px 20px -2px rgba(7, 10, 17, 0.5)';

  return (
    <div
      className={`multiversa-card multiversa-card--${variant} ${
        isInteractive ? 'multiversa-card--interactive' : ''
      } ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1rem',
        backgroundColor: baseBg,
        border: `1px solid ${borderColor}`,
        boxShadow,
        padding: '1.5rem',
        color: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease',
        cursor: isInteractive ? 'pointer' : undefined,
        overflow: 'hidden',
        ...style,
      }}
      {...props}
    >
      {/* Header Slot (Title, Subtitle, Icon, Badge) */}
      {(title || subtitle || badge || icon) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: children ? '1rem' : 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {icon && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '0.625rem',
                  backgroundColor: 'rgba(109, 40, 217, 0.12)',
                  border: '1px solid rgba(109, 40, 217, 0.25)',
                  color: colors.violet.cosmic,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3
                  style={{
                    margin: 0,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: '#F8FAFC',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p
                  style={{
                    margin: '0.25rem 0 0 0',
                    fontSize: '0.875rem',
                    color: colors.slate[400],
                    lineHeight: 1.4,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {badge && (
            <div style={{ flexShrink: 0, alignSelf: 'flex-start' }}>
              {badge}
            </div>
          )}
        </div>
      )}

      {/* Body Content Slot */}
      {children && (
        <div
          style={{
            flex: '1 1 auto',
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            color: '#CBD5E1',
          }}
        >
          {children}
        </div>
      )}

      {/* Footer Slot */}
      {footer && (
        <div
          style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: `1px solid ${colors.borders.subtle}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8125rem',
            color: colors.slate[400],
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
