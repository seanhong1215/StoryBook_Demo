import type { ReactNode } from 'react'
import './Tooltip.css'

export interface TooltipProps {
  /** Content shown inside the tooltip bubble. */
  title?: ReactNode
  /** Bubble position relative to the trigger. */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Trigger element. */
  children?: ReactNode
  className?: string
}

export const Tooltip = ({
  title,
  placement = 'top',
  children,
  className = '',
}: TooltipProps) => {
  return (
    <span
      className={['tooltip', `tooltip--${placement}`, className].filter(Boolean).join(' ')}
    >
      <span className="tooltip__trigger" tabIndex={0}>
        {children}
      </span>
      <span className="tooltip__content" role="tooltip">
        {title}
      </span>
    </span>
  )
}
