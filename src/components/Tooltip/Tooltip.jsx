import './Tooltip.css'

export const Tooltip = ({
  title,
  placement = 'top',
  children,
  className = '',
}) => {
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
