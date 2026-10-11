import type { HTMLAttributes, ReactNode } from 'react';
import { statusColors, withAlpha } from '../tokens/colors.js';

export type StatusPillVariant = 'production' | 'operating' | 'standard' | 'delivers';
export type StatusPillSize = 'sm' | 'md' | 'lg';

export interface StatusPillProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic badge variant:
   * - 'production': Active production deployment (signal green, low chroma)
   * - 'operating': Ongoing autonomous operations (Cosmic Night primary)
   * - 'standard': Standard benchmark or baseline specification (muted foreground)
   * - 'delivers': Milestone delivery / commitment verified (alternative gold)
   */
  variant?: StatusPillVariant;

  /** Label text override or shorthand */
  label?: ReactNode;

  /** Size preset */
  size?: StatusPillSize;

  /** Optional leading icon */
  icon?: ReactNode;

  /** Whether the status beacon dot pulses */
  pulse?: boolean;

  /** Children nodes */
  children?: ReactNode;

  className?: string;
}

const variantStyles: Record<
  StatusPillVariant,
  { bg: string; border: string; text: string; dot: string; glow: string; defaultLabel: string }
> = {
  production: { ...statusColors.production, glow: 'oklch(0.8 0.11 165 / 0.5)', defaultLabel: 'Production' },
  operating: { ...statusColors.operating, glow: withAlpha('primary', 0.5), defaultLabel: 'Operating' },
  standard: { ...statusColors.standard, glow: withAlpha('mutedForeground', 0.4), defaultLabel: 'Standard' },
  delivers: { ...statusColors.delivers, glow: withAlpha('alternative', 0.5), defaultLabel: 'Delivers' },
};

const sizeStyles: Record<
  StatusPillSize,
  {
    padding: string;
    fontSize: string;
    dotSize: string;
    gap: string;
  }
> = {
  sm: {
    padding: '0.125rem 0.5rem',
    fontSize: '0.6875rem',
    dotSize: '0.375rem',
    gap: '0.375rem',
  },
  md: {
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    dotSize: '0.5rem',
    gap: '0.5rem',
  },
  lg: {
    padding: '0.375rem 1rem',
    fontSize: '0.875rem',
    dotSize: '0.625rem',
    gap: '0.625rem',
  },
};

/**
 * StatusPill
 *
 * Highly refined status badge component representing Multiversa operating and delivery tiers.
 */
export function StatusPill({
  variant = 'operating',
  label,
  size = 'md',
  icon,
  pulse = true,
  children,
  className = '',
  style,
  ...props
}: StatusPillProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <span
      role="status"
      className={`multiversa-status-pill multiversa-status-pill--${variant} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        lineHeight: 1.2,
        fontWeight: 600,
        fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', monospace",
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        borderRadius: '9999px',
        backgroundColor: v.bg,
        border: `1px solid ${v.border}`,
        color: v.text,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
        ...style,
      }}
      {...props}
    >
      {/* Status indicator dot with optional pulse */}
      <span
        style={{
          position: 'relative',
          display: 'inline-flex',
          width: s.dotSize,
          height: s.dotSize,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {pulse && (
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '9999px',
              backgroundColor: v.dot,
              opacity: 0.75,
              animation: 'multiversa-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          />
        )}
        <span
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '100%',
            height: '100%',
            borderRadius: '9999px',
            backgroundColor: v.dot,
            boxShadow: `0 0 6px ${v.glow}`,
          }}
        />
      </span>

      {icon && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <span>{label ?? children ?? v.defaultLabel}</span>
    </span>
  );
}
