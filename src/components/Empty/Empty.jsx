import { Button } from '../Button/Button'
import './Empty.css'

export const Empty = ({
  title = 'No data',
  description,
  image,
  action,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={['empty', className].filter(Boolean).join(' ')}>
      <div className="empty__image" aria-hidden="true">
        {image || <span className="empty__box" />}
      </div>
      <h3 className="empty__title">{title}</h3>
      {description && <p className="empty__description">{description}</p>}
      {(action || actionText) && (
        <div className="empty__action">
          {action || <Button type="primary" size="sm" onClick={onAction}>{actionText}</Button>}
        </div>
      )}
    </div>
  )
}
