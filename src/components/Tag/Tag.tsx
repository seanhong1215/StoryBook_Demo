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

export const Tag = ({
  color = 'default',
  closable = false,
  className = '',
  children,
  onClose,
  ...props
}: TagProps) => {
  return (
    <span
      className={['tag', `tag--${color}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      <span className="tag__label">{children}</span>
      {closable && (
        <button
          className="tag__close"
          type="button"
          aria-label="Close tag"
          onClick={onClose}
        >
          x
        </button>
      )}
    </span>
  )
}
