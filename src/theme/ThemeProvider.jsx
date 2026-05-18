export const ThemeProvider = ({
  productLine = 'core',
  children,
  className,
  ...props
}) => {
  return (
    <div
      data-product-line={productLine}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}
