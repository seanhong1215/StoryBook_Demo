import './Card.css'

export const Card = ({ title, description, footer, children }) => {
  return (
    <div className="card">
      {title && (
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
        </div>
      )}
      <div className="card__body">
        {description && <p className="card__description">{description}</p>}
        {children}
      </div>
      {footer && (
        <div className="card__footer">{footer}</div>
      )}
    </div>
  )
}
