import type { Locale } from './types'

export const zhTW: Locale = {
  locale: 'zh-TW',
  alert: {
    close: '關閉提示',
  },
  empty: {
    title: '沒有資料',
  },
  input: {
    clear: '清除輸入',
  },
  modal: {
    ok: '確定',
    cancel: '取消',
    close: '關閉對話框',
  },
  pagination: {
    label: '分頁',
    previous: '上一頁',
    next: '下一頁',
    total: (total) => `共 ${total} 筆`,
    page: (page) => `第 ${page} 頁`,
  },
  select: {
    placeholder: '請選擇',
  },
  table: {
    emptyText: '沒有資料',
    loading: '載入中',
    selectAll: '全選',
    selectRow: (rowKey) => `選取 ${rowKey}`,
  },
}
