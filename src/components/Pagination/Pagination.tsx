import { forwardRef } from 'react'
import { useLocale } from '../../config/context'
import { Button } from '../Button/Button'
import './Pagination.css'

export interface PaginationProps {
  /** Current page (1-based). */
  current?: number
  /** Total number of items. */
  total?: number
  /** Items per page. */
  pageSize?: number
  /** Disables all pagination controls. */
  disabled?: boolean
  /** Shows the total item count. */
  showTotal?: boolean
  /**
   * Accessible name of the navigation landmark.
   *
   * Give each Pagination on a page its own name — two landmarks sharing one name
   * are indistinguishable when navigating by landmark (axe: landmark-unique).
   */
  label?: string
  className?: string
  /** Called with the new page number. */
  onChange?: (page: number) => void
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(({
  current = 1,
  total = 0,
  pageSize = 10,
  disabled = false,
  showTotal = true,
  label,
  className = '',
  onChange,
}, ref) => {
  const locale = useLocale()
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((page) => (
      page === 1 ||
      page === totalPages ||
      Math.abs(page - current) <= 1
    ))

  const changePage = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === current) return
    onChange?.(page)
  }

  return (
    <nav
      ref={ref}
      className={['mds-pagination', className].filter(Boolean).join(' ')}
      aria-label={label ?? locale.pagination.label}
    >
      {showTotal && <span className="mds-pagination__total">{locale.pagination.total(total)}</span>}
      <Button
        variant="secondary"
        size="sm"
        disabled={disabled || current <= 1}
        onClick={() => changePage(current - 1)}
      >
        {locale.pagination.previous}
      </Button>
      <div className="mds-pagination__pages">
        {pages.map((page, index) => {
          const previous = pages[index - 1]
          const showGap = previous && page - previous > 1

          return (
            <span className="mds-pagination__item" key={page}>
              {showGap && <span className="mds-pagination__ellipsis">...</span>}
              <button
                className="mds-pagination__page"
                type="button"
                // 只有數字的按鈕讀屏會唸成孤零零的「3」，補上完整名稱
                aria-label={locale.pagination.page(page)}
                aria-current={page === current ? 'page' : undefined}
                disabled={disabled}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            </span>
          )
        })}
      </div>
      <Button
        variant="secondary"
        size="sm"
        disabled={disabled || current >= totalPages}
        onClick={() => changePage(current + 1)}
      >
        {locale.pagination.next}
      </Button>
    </nav>
  )
})

Pagination.displayName = 'Pagination'
