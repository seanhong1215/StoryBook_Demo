import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import './Alert.css'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic tone of the alert. */
  type?: 'success' | 'info' | 'warning' | 'error'
  /** Primary message line. */
  message?: ReactNode
  /** Supporting copy under the message; children are rendered here too. */
  description?: ReactNode
  /** Shows the tone icon before the content. */
  showIcon?: boolean
  /** Renders a close button. */
  closable?: boolean
  /** Custom action node aligned to the end. */
  action?: ReactNode
  /** Called when the close button is clicked. */
  onClose?: MouseEventHandler<HTMLButtonElement>
  children?: ReactNode
}

export const Alert = ({
  type = 'info',
  message,
  description,
  showIcon = true,
  closable = false,
  action,
  className = '',
  onClose,
  children,
  ...props
}: AlertProps) => {
  const classes = [
    'alert',
    `alert--${type}`,
    description || children ? 'alert--with-description' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} role="alert" {...props}>
      {showIcon && <span className="alert__icon" aria-hidden="true" />}
      <div className="alert__content">
        {message && <div className="alert__message">{message}</div>}
        {(description || children) && (
          <div className="alert__description">{description || children}</div>
        )}
      </div>
      {action && <div className="alert__action">{action}</div>}
      {closable && (
        <button
          className="alert__close"
          type="button"
          aria-label="Close alert"
          onClick={onClose}
        >
          x
        </button>
      )}
    </div>
  )
}
