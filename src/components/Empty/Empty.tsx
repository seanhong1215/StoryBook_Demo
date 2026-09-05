import { forwardRef } from 'react'
import type { MouseEventHandler, ReactNode } from 'react'
import { useLocale } from '../../config/context'
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

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(({
  title,
  description,
  image,
  action,
  actionText,
  onAction,
  className = '',
}, ref) => {
  const locale = useLocale()

  return (
    <div ref={ref} className={['mds-empty', className].filter(Boolean).join(' ')}>
      <div className="mds-empty__image" aria-hidden="true">
        {image || <span className="mds-empty__box" />}
      </div>
      <h3 className="mds-empty__title">{title ?? locale.empty.title}</h3>
      {description && <p className="mds-empty__description">{description}</p>}
      {(action || actionText) && (
        <div className="mds-empty__action">
          {action || <Button type="primary" size="sm" onClick={onAction}>{actionText}</Button>}
        </div>
      )}
    </div>
  )
})

Empty.displayName = 'Empty'
