import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import './Badge.css'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color treatment. */
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'secondary'
  /** Badge density and text size. */
  size?: 'sm' | 'md' | 'lg'
  /** Shows a compact status indicator before the label. */
  dot?: boolean
  /** Badge label. */
  children?: ReactNode
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...props
}, ref) => {
  const classes = [
    'mds-badge',
    `mds-badge--${variant}`,
    `mds-badge--${size}`,
    dot ? 'mds-badge--dot' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <span ref={ref} className={classes} {...props}>
      {dot && <span className="mds-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  )
})

Badge.displayName = 'Badge'
