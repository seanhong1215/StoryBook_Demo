import { forwardRef } from 'react'
import type { AllHTMLAttributes, ElementType, ReactNode } from 'react'
import './Card.css'

// AllHTMLAttributes 讓 as="a" 等多型用法能傳 href 之類的元素屬性
export interface CardProps extends Omit<AllHTMLAttributes<HTMLElement>, 'title' | 'size' | 'as'> {
  /** HTML element rendered as the container. */
  as?: ElementType
  /** Header title. */
  title?: ReactNode
  /**
   * Heading level for `title`. Defaults to `h3`.
   *
   * The correct level depends on the surrounding document outline — headings must
   * not skip levels. If the card sits directly under an `<h1>`, pass `titleAs="h2"`.
   */
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
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

/** ref 指向 as 指定的容器元素（預設 div），故型別為泛用的 HTMLElement。 */
export const Card = forwardRef<HTMLElement, CardProps>(({
  as: Component = 'div',
  title,
  titleAs: TitleTag = 'h3',
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
}, ref) => {
  const cardPadding = size === 'small' ? 'sm' : padding

  const classes = [
    'mds-card',
    `mds-card--${variant}`,
    `mds-card--padding-${cardPadding}`,
    bordered ? '' : 'mds-card--borderless',
    interactive || hoverable ? 'mds-card--interactive' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Component ref={ref} className={classes} {...props}>
      {title && (
        <div className="mds-card__header">
          <TitleTag className="mds-card__title">{title}</TitleTag>
          {extra && <div className="mds-card__extra">{extra}</div>}
        </div>
      )}
      <div className="mds-card__body">
        {description && <p className="mds-card__description">{description}</p>}
        {children}
      </div>
      {footer && (
        <div className={`mds-card__footer mds-card__footer--${footerAlign}`}>{footer}</div>
      )}
    </Component>
  )
})

Card.displayName = 'Card'
