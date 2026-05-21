import './Button.css'

export const Button = ({
  type,
  htmlType = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  block = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const nativeTypes = ['button', 'submit', 'reset']
  const visualType = nativeTypes.includes(type) ? variant : (type || variant)
  const buttonType = nativeTypes.includes(type) ? type : htmlType

  const classes = [
    'btn',
    `btn--${visualType}`,
    `btn--${size}`,
    fullWidth || block ? 'btn--full' : '',
    loading ? 'btn--loading' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type={buttonType}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
      <span className="btn__label">{children}</span>
      {!loading && rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
    </button>
  )
}
