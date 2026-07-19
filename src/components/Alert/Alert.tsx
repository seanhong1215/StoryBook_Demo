import { forwardRef } from 'react'
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

export const Alert = forwardRef<HTMLDivElement, AlertProps>(({
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
}, ref) => {
  const classes = [
    'mds-alert',
    `mds-alert--${type}`,
    description || children ? 'mds-alert--with-description' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} role="alert" {...props}>
      {showIcon && <span className="mds-alert__icon" aria-hidden="true" />}
      <div className="mds-alert__content">
        {message && <div className="mds-alert__message">{message}</div>}
        {(description || children) && (
          <div className="mds-alert__description">{description || children}</div>
        )}
      </div>
      {action && <div className="mds-alert__action">{action}</div>}
      {closable && (
        <button
          className="mds-alert__close"
          type="button"
          aria-label="Close alert"
          onClick={onClose}
        >
          x
        </button>
      )}
    </div>
  )
})

Alert.displayName = 'Alert'
