import { forwardRef } from 'react'
import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { useLocale } from '../../config/context'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/Icon'
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

const TYPE_ICONS: Record<NonNullable<AlertProps['type']>, IconName> = {
  success: 'check-circle',
  info: 'info-circle',
  warning: 'alert-triangle',
  error: 'x-circle',
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
  const locale = useLocale()
  const classes = [
    'mds-alert',
    `mds-alert--${type}`,
    description || children ? 'mds-alert--with-description' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={classes} role="alert" {...props}>
      {showIcon && <Icon className="mds-alert__icon" name={TYPE_ICONS[type]} size={16} />}
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
          aria-label={locale.alert.close}
          onClick={onClose}
        >
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  )
})

Alert.displayName = 'Alert'
