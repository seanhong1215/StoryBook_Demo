import { createContext, useContext } from 'react'
import { en } from '../locale/en'
import type { Locale } from '../locale/types'

export interface ConfigContextValue {
  /** 元件內建文案。 */
  locale: Locale
  /** 浮層（Tooltip / Dropdown）要掛在哪個節點下，預設 `document.body`。 */
  getPopupContainer?: () => HTMLElement | null
}

/*
 * 預設值是英文 —— 沒有包 ConfigProvider 的使用端（含大部分 story）
 * 必須照樣能運作，不能因為少包一層就沒有文案。
 */
export const ConfigContext = createContext<ConfigContextValue>({ locale: en })

export const useConfig = () => useContext(ConfigContext)

/** 元件取用內建文案的捷徑。 */
export const useLocale = () => useContext(ConfigContext).locale
