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

export const Badge = ({
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...props
}: BadgeProps) => {
  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    dot ? 'badge--dot' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes} {...props}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {children}
    </span>
  )
}
