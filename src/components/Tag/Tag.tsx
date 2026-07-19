import { forwardRef } from 'react'
import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import './Tag.css'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color treatment. */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  /** Renders a close button after the label. */
  closable?: boolean
  /** Called when the close button is clicked. */
  onClose?: MouseEventHandler<HTMLButtonElement>
  /** Tag label. */
  children?: ReactNode
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(({
  color = 'default',
  closable = false,
  className = '',
  children,
  onClose,
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      className={['mds-tag', `mds-tag--${color}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="mds-tag__label">{children}</span>
      {closable && (
        <button
          className="mds-tag__close"
          type="button"
          aria-label="Close tag"
          onClick={onClose}
        >
          x
        </button>
      )}
    </span>
  )
})

Tag.displayName = 'Tag'
