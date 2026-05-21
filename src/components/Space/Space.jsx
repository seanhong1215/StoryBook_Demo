import './Space.css'

export const Space = ({
  as: Component = 'div',
  direction = 'horizontal',
  size = 'md',
  align = 'center',
  wrap = false,
  className = '',
  children,
  ...props
}) => {
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
