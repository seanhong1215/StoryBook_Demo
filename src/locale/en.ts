import type { Locale } from './types'

export const en: Locale = {
  locale: 'en',
  alert: {
    close: 'Close alert',
  },
  empty: {
    title: 'No data',
  },
  input: {
    clear: 'Clear input',
  },
  modal: {
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close modal',
  },
  pagination: {
    label: 'Pagination',
    previous: 'Previous',
    next: 'Next',
    total: (total) => `${total} items`,
    page: (page) => `Page ${page}`,
  },
  select: {
    placeholder: 'Select an option',
  },
  table: {
    emptyText: 'No data',
    loading: 'Loading',
    selectAll: 'Select all rows',
    selectRow: (rowKey) => `Select row ${rowKey}`,
  },
}
