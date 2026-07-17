import type { AllHTMLAttributes, ElementType, ReactNode } from 'react'
import './Card.css'

// AllHTMLAttributes 讓 as="a" 等多型用法能傳 href 之類的元素屬性
export interface CardProps extends Omit<AllHTMLAttributes<HTMLElement>, 'title' | 'size' | 'as'> {
  /** HTML element rendered as the container. */
  as?: ElementType
  /** Header title. */
  title?: ReactNode
  /** Extra node aligned to the end of the header. */
  extra?: ReactNode
  /** Muted copy rendered before the body content. */
  description?: ReactNode
  /** Footer content. */
  footer?: ReactNode
  /** Visual style of the card. */
  variant?: 'default' | 'outlined' | 'elevated' | 'ghost'
  /** Inner padding of the card. */
  padding?: 'sm' | 'md' | 'lg'
  /** Adds hover affordance for clickable cards. */
  interactive?: boolean
  /** Renders the card border. */
  bordered?: boolean
  /** Legacy alias of interactive. */
  hoverable?: boolean
  /** Legacy alias: 'small' maps padding to 'sm'. */
  size?: 'small'
  /** Horizontal alignment of the footer content. */
  footerAlign?: 'start' | 'center' | 'between' | 'end'
  /** Body content. */
  children?: ReactNode
}

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
}: CardProps) => {
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
