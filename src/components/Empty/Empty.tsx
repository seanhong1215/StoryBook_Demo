import type { MouseEventHandler, ReactNode } from 'react'
import { Button } from '../Button/Button'
import './Empty.css'

export interface EmptyProps {
  /** Headline of the empty state. */
  title?: ReactNode
  /** Supporting copy under the title. */
  description?: ReactNode
  /** Custom illustration replacing the default placeholder. */
  image?: ReactNode
  /** Custom action node; takes precedence over actionText. */
  action?: ReactNode
  /** Label of the default action button. */
  actionText?: ReactNode
  /** Called when the default action button is clicked. */
  onAction?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export const Empty = ({
  title = 'No data',
  description,
  image,
  action,
  actionText,
  onAction,
  className = '',
}: EmptyProps) => {
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
