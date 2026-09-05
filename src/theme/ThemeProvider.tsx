import { forwardRef } from 'react'
import { ConfigProvider } from '../config/ConfigProvider'
import type { ConfigProviderProps, ProductLine } from '../config/ConfigProvider'

export type { ProductLine }

/**
 * 只處理主題與產品線的 provider。
 *
 * 語系與浮層容器等全域設定請改用 `ConfigProvider` —— 它是這個的超集。
 * ThemeProvider 保留下來是為了不讓既有使用端因為改名而壞掉，
 * 內部直接委派，兩者行為完全一致。
 */
export type ThemeProviderProps = Omit<ConfigProviderProps, 'locale' | 'getPopupContainer'>

export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>((props, ref) => (
  <ConfigProvider ref={ref} {...props} />
))

ThemeProvider.displayName = 'ThemeProvider'
