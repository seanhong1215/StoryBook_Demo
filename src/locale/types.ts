/**
 * 元件內建文案。
 *
 * 只收「元件自己會渲染、使用端沒辦法從外面傳進來」的字串 —— 主要是無障礙標籤
 * 與預設按鈕文字。使用端傳了 prop（例如 `okText`）時一律以 prop 為準，
 * locale 只是預設值。
 *
 * 需要帶入數值的用函式，不用字串樣板 —— 各語言的語序不同，
 * 「共 6 筆」與「6 items」沒辦法用同一個 `{n} xxx` 模板表達。
 */
export interface Locale {
  /** BCP 47 語言標記，例如 `en`、`zh-TW`。 */
  locale: string
  alert: {
    close: string
  }
  empty: {
    title: string
  }
  input: {
    clear: string
  }
  modal: {
    ok: string
    cancel: string
    close: string
  }
  pagination: {
    label: string
    previous: string
    next: string
    total: (total: number) => string
    page: (page: number) => string
  }
  select: {
    placeholder: string
  }
  table: {
    emptyText: string
    loading: string
    selectAll: string
    selectRow: (rowKey: string | number) => string
  }
}
