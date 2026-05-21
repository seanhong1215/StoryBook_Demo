import './Badge.css'

export const Badge = ({
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...props
}) => {
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
