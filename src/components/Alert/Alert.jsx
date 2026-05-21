import './Alert.css'

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
}) => {
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
