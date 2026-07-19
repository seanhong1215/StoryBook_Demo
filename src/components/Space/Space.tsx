import { forwardRef } from 'react'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import './Space.css'

export interface SpaceProps extends HTMLAttributes<HTMLElement> {
  /** HTML element rendered as the container. */
  as?: ElementType
  /** Layout axis of the items. */
  direction?: 'horizontal' | 'vertical'
  /** Gap between items. */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Cross-axis alignment of the items. */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Allows items to wrap to the next line. */
  wrap?: boolean
  /** Items to lay out. */
  children?: ReactNode
}

/** ref 指向 as 指定的容器元素（預設 div）。 */
export const Space = forwardRef<HTMLElement, SpaceProps>(({
  as: Component = 'div',
  direction = 'horizontal',
  size = 'md',
  align = 'center',
  wrap = false,
  className = '',
  children,
  ...props
}, ref) => {
  const classes = [
    'mds-space',
    `mds-space--${direction}`,
    `mds-space--${size}`,
    `mds-space--align-${align}`,
    wrap ? 'mds-space--wrap' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  )
})

Space.displayName = 'Space'
