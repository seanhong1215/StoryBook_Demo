import type { HTMLAttributes } from 'react'

export type ProductLine = 'core' | 'commerce' | 'finance' | 'internal'

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Product line whose brand tokens apply inside this provider. */
  productLine?: ProductLine
  /** Color scheme applied inside this provider. */
  theme?: 'light' | 'dark'
}

export const ThemeProvider = ({
  productLine = 'core',
  theme,
  children,
  className,
  ...props
}: ThemeProviderProps) => {
  return (
    <div
      data-product-line={productLine}
      data-theme={theme}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}
