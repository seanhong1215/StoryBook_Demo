import './Card.css'

export const Card = ({
  as: Component = 'div',
  title,
  extra,
  description,
  footer,
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  bordered = true,
  hoverable = false,
  size,
  footerAlign = 'end',
  className = '',
  ...props
}) => {
  const cardPadding = size === 'small' ? 'sm' : padding

  const classes = [
    'card',
    `card--${variant}`,
    `card--padding-${cardPadding}`,
    bordered ? '' : 'card--borderless',
    interactive || hoverable ? 'card--interactive' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Component className={classes} {...props}>
      {title && (
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
          {extra && <div className="card__extra">{extra}</div>}
        </div>
      )}
      <div className="card__body">
        {description && <p className="card__description">{description}</p>}
        {children}
      </div>
      {footer && (
        <div className={`card__footer card__footer--${footerAlign}`}>{footer}</div>
      )}
    </Component>
  )
}
