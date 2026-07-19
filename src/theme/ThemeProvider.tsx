import { forwardRef, useEffect } from 'react'
import type { HTMLAttributes } from 'react'

export type ProductLine = 'core' | 'commerce' | 'finance' | 'internal'

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Product line whose brand tokens apply inside this provider. */
  productLine?: ProductLine
  /** Color scheme applied inside this provider. */
  theme?: 'light' | 'dark'
  /**
   * Applies the theme attributes to `<html>` instead of only this wrapper.
   *
   * Components that render through a portal (Modal, and any future portaled
   * Tooltip/Dropdown) mount on `document.body` — outside this wrapper — so a
   * scoped provider never reaches them. Set this on the app root so portaled
   * content picks up the same tokens.
   */
  global?: boolean
}

export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(({
  productLine = 'core',
  theme,
  global = false,
  children,
  className,
  ...props
}, ref) => {
  useEffect(() => {
    if (!global) return undefined

    const root = document.documentElement
    const previousProductLine = root.getAttribute('data-product-line')
    const previousTheme = root.getAttribute('data-theme')

    root.setAttribute('data-product-line', productLine)
    if (theme) {
      root.setAttribute('data-theme', theme)
    } else {
      root.removeAttribute('data-theme')
    }

    return () => {
      // 還原成掛載前的值，避免巢狀 / 條件式 provider 卸載後留下殘值
      if (previousProductLine === null) {
        root.removeAttribute('data-product-line')
      } else {
        root.setAttribute('data-product-line', previousProductLine)
      }

      if (previousTheme === null) {
        root.removeAttribute('data-theme')
      } else {
        root.setAttribute('data-theme', previousTheme)
      }
    }
  }, [global, productLine, theme])

  return (
    <div
      ref={ref}
      data-product-line={global ? undefined : productLine}
      data-theme={global ? undefined : theme}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
})

ThemeProvider.displayName = 'ThemeProvider'
