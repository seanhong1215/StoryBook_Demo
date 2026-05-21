import { Button } from '../Button/Button'
import './Pagination.css'

export const Pagination = ({
  current = 1,
  total = 0,
  pageSize = 10,
  disabled = false,
  showTotal = true,
  className = '',
  onChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((page) => (
      page === 1 ||
      page === totalPages ||
      Math.abs(page - current) <= 1
    ))

  const changePage = (page) => {
    if (disabled || page < 1 || page > totalPages || page === current) return
    onChange?.(page)
  }

  return (
    <nav
      className={['pagination', className].filter(Boolean).join(' ')}
      aria-label="Pagination"
    >
      {showTotal && <span className="pagination__total">{total} items</span>}
      <Button
        variant="secondary"
        size="sm"
        disabled={disabled || current <= 1}
        onClick={() => changePage(current - 1)}
      >
        Previous
      </Button>
      <div className="pagination__pages">
        {pages.map((page, index) => {
          const previous = pages[index - 1]
          const showGap = previous && page - previous > 1

          return (
            <span className="pagination__item" key={page}>
              {showGap && <span className="pagination__ellipsis">...</span>}
              <button
                className="pagination__page"
                type="button"
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
        Next
      </Button>
    </nav>
  )
}
