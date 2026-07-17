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

export const Space = ({
  as: Component = 'div',
  direction = 'horizontal',
  size = 'md',
  align = 'center',
  wrap = false,
  className = '',
  children,
  ...props
}: SpaceProps) => {
  const classes = [
    'space',
    `space--${direction}`,
    `space--${size}`,
    `space--align-${align}`,
    wrap ? 'space--wrap' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
