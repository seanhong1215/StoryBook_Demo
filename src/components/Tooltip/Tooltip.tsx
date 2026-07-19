import { forwardRef } from 'react'
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

/** ref 指向外層 wrapper，供定位 / measure 使用。 */
export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(({
  title,
  placement = 'top',
  children,
  className = '',
}, ref) => {
  return (
    <span
      ref={ref}
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
})

Tooltip.displayName = 'Tooltip'
