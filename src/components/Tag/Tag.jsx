import './Tag.css'

export const Tag = ({
  color = 'default',
  closable = false,
  className = '',
  children,
  onClose,
  ...props
}) => {
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
