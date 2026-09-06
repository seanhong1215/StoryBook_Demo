import { forwardRef, useEffect, useMemo } from 'react'
import type { HTMLAttributes } from 'react'
import { ConfigContext, useConfig } from './context'
import type { Locale } from '../locale/types'

/**
 * 內建四條產品線，但不限於這四個。
 *
 * 消費端只要在自己的 CSS 加一組 `[data-product-line="acme"]` 覆寫品牌 token
 * 就能新增產品線，型別不該擋住這件事。`string & Record<never, never>` 讓字串
 * 通過型別檢查的同時，編輯器仍然會提示內建的四個值
 * （直接寫成 `| string` 會讓聯集塌成 string，提示就沒了）。
 */
export type ProductLine =
  | 'core'
  | 'commerce'
  | 'finance'
  | 'internal'
  | (string & Record<never, never>)

export interface ConfigProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Product line whose brand tokens apply inside this provider. */
  productLine?: ProductLine
  /** Color scheme applied inside this provider. */
  theme?: 'light' | 'dark'
  /**
   * Applies the theme attributes to `<html>` instead of only this wrapper.
   *
   * Components that render through a portal (Modal, Tooltip, Dropdown) mount on
   * `document.body` — outside this wrapper — so a scoped provider never reaches
   * them. Set this on the app root so portaled content picks up the same tokens.
   */
  global?: boolean
  /** Built-in copy for component defaults and accessible labels. */
  locale?: Locale
  /** Node that popups (Tooltip, Dropdown) mount into; defaults to `document.body`. */
  getPopupContainer?: () => HTMLElement | null
}

/**
 * 全域設定：主題、產品線、語系、浮層容器。
 *
 * 巢狀使用時只覆寫有傳的項目 —— 例如某個區塊要換產品線但沿用外層語系，
 * 只傳 productLine 即可，locale 會從外層繼承。
 */
export const ConfigProvider = forwardRef<HTMLDivElement, ConfigProviderProps>(({
  productLine = 'core',
  theme,
  global = false,
  locale,
  getPopupContainer,
  children,
  className,
  ...props
}, ref) => {
  const parent = useConfig()

  const contextValue = useMemo(() => ({
    locale: locale ?? parent.locale,
    getPopupContainer: getPopupContainer ?? parent.getPopupContainer,
  }), [locale, getPopupContainer, parent.locale, parent.getPopupContainer])

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
    <ConfigContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-product-line={global ? undefined : productLine}
        data-theme={global ? undefined : theme}
        className={className}
        {...props}
      >
        {children}
      </div>
    </ConfigContext.Provider>
  )
})

ConfigProvider.displayName = 'ConfigProvider'
