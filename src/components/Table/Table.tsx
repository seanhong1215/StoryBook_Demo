import { forwardRef, useMemo, useState } from 'react'
import type { ForwardedRef, ReactElement, ReactNode, Ref } from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import { Empty } from '../Empty/Empty'
import { Icon } from '../Icon/Icon'
import { Pagination } from '../Pagination/Pagination'
import './Table.css'

export type TableRowKey = string | number

export interface TableColumn<T> {
  /** Column header content. */
  title?: ReactNode
  /** Record field rendered in this column. */
  dataIndex?: Extract<keyof T, string>
  /** Unique column key; falls back to dataIndex. */
  key?: string
  /** true for the built-in comparator, or a custom compare function. */
  sorter?: boolean | ((a: T, b: T) => number)
  /** Custom cell renderer. */
  render?: (value: T[Extract<keyof T, string>] | undefined, record: T, index: number) => ReactNode
}

export interface TableRowSelection {
  /** Keys of the currently selected rows. */
  selectedRowKeys?: TableRowKey[]
  /** Called with the next selected row keys. */
  onChange?: (selectedRowKeys: TableRowKey[]) => void
}

export interface TableSort {
  /** Sorted column: `column.key`, or `dataIndex` when no key is set. */
  columnKey: string
  order: 'ascend' | 'descend'
}

export interface TablePaginationConfig {
  /** Current page (1-based). Providing it makes pagination controlled. */
  current?: number
  /** Rows per page. */
  pageSize?: number
  /**
   * Total row count. Required with `manual`, where `dataSource` only holds the
   * current page; otherwise it is derived from the data length.
   */
  total?: number
}

/** Pagination state handed to `onChange`, with every value resolved. */
export interface TableChangeInfo {
  current: number
  pageSize: number
  total: number
}

export interface TableProps<T> {
  /** Column definitions. */
  columns?: TableColumn<T>[]
  /** Row records. With `manual`, only the rows of the current page. */
  dataSource?: T[]
  /** Record field used as the row key, or a function deriving it. */
  rowKey?: Extract<keyof T, string> | ((record: T) => TableRowKey)
  /** Shows the loading overlay. */
  loading?: boolean
  /** Pagination settings; false disables pagination. */
  pagination?: false | TablePaginationConfig
  /** Controlled sort state; null means unsorted. */
  sort?: TableSort | null
  /** Initial sort state for uncontrolled usage. */
  defaultSort?: TableSort | null
  /**
   * Leaves sorting and paging to the caller — typically a server.
   *
   * Table then renders `dataSource` as-is instead of sorting and slicing it,
   * and reports the requested state through `onChange`.
   */
  manual?: boolean
  /** Enables row selection checkboxes. */
  rowSelection?: TableRowSelection
  /** Title of the built-in empty state. */
  emptyText?: ReactNode
  className?: string
  /** Called when the page or the sort changes. */
  onChange?: (pagination: TableChangeInfo, sort: TableSort | null) => void
}

const getRowKey = <T,>(record: T, rowKey: Extract<keyof T, string> | ((record: T) => TableRowKey)) => (
  typeof rowKey === 'function' ? rowKey(record) : record[rowKey] as TableRowKey
)

/**
 * `sorter: true` 的預設比較。
 *
 * 不能只用 localeCompare —— 數字欄位會被當字串比，排出 1, 10, 2 這種結果。
 * 依型別分流，字串再開 numeric 選項，"ORD-2" 才會排在 "ORD-10" 前面。
 * 空值一律視為最小（升冪時排最前面）。
 */
const defaultCompare = (a: unknown, b: unknown): number => {
  const aEmpty = a === undefined || a === null || a === ''
  const bEmpty = b === undefined || b === null || b === ''
  if (aEmpty || bEmpty) return aEmpty && bEmpty ? 0 : (aEmpty ? -1 : 1)

  if (typeof a === 'number' && typeof b === 'number') return a - b
  if (typeof a === 'boolean' && typeof b === 'boolean') return Number(a) - Number(b)
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime()

  return String(a).localeCompare(String(b), undefined, { numeric: true })
}

const TableInner = <T,>({
  columns = [],
  dataSource = [],
  rowKey = 'key' as Extract<keyof T, string>,
  loading = false,
  pagination = {},
  sort: controlledSort,
  defaultSort = null,
  manual = false,
  rowSelection,
  emptyText = 'No data',
  className = '',
  onChange,
}: TableProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
  const paginationConfig = pagination === false ? null : pagination
  const pageSize = paginationConfig?.pageSize ?? 5

  const isSortControlled = controlledSort !== undefined
  const [internalSort, setInternalSort] = useState<TableSort | null>(defaultSort)
  const currentSort = isSortControlled ? controlledSort : internalSort

  const isPageControlled = paginationConfig?.current !== undefined
  const [internalPage, setInternalPage] = useState(1)
  const requestedPage = paginationConfig?.current ?? internalPage

  const sortedData = useMemo(() => {
    if (manual || !currentSort) return dataSource

    const column = columns.find((item) => (item.key || item.dataIndex) === currentSort.columnKey)
    if (!column?.sorter) return dataSource

    const compare = typeof column.sorter === 'function'
      ? column.sorter
      : (a: T, b: T) => defaultCompare(
        column.dataIndex && a[column.dataIndex],
        column.dataIndex && b[column.dataIndex],
      )

    return [...dataSource].sort((a, b) => {
      const result = compare(a, b)
      return currentSort.order === 'ascend' ? result : -result
    })
  }, [columns, dataSource, currentSort, manual])

  const total = paginationConfig?.total ?? sortedData.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  /*
   * 夾回有效範圍。資料變少時（例如上層篩選掉大半列）留在原本的頁碼會 slice 到
   * 空陣列，畫面變成一張空表格 —— 使用者只會覺得資料不見了。
   */
  const page = Math.min(requestedPage, totalPages)

  const pagedData = paginationConfig && !manual
    ? sortedData.slice((page - 1) * pageSize, page * pageSize)
    : sortedData

  const emitChange = (nextPage: number, nextSort: TableSort | null) => {
    onChange?.({ current: nextPage, pageSize, total }, nextSort)
  }

  const changePage = (nextPage: number) => {
    if (!isPageControlled) setInternalPage(nextPage)
    emitChange(nextPage, currentSort)
  }

  const selectedRowKeys = rowSelection?.selectedRowKeys || []
  const visibleRowKeys = pagedData.map((record) => getRowKey(record, rowKey))
  const allVisibleSelected = visibleRowKeys.length > 0
    && visibleRowKeys.every((key) => selectedRowKeys.includes(key))
  const someVisibleSelected = visibleRowKeys.some((key) => selectedRowKeys.includes(key))
    && !allVisibleSelected

  const toggleSort = (column: TableColumn<T>) => {
    if (!column.sorter) return
    const columnKey = column.key || column.dataIndex
    if (!columnKey) return

    // 升冪 → 降冪 → 取消
    const nextSort: TableSort | null = !currentSort || currentSort.columnKey !== columnKey
      ? { columnKey, order: 'ascend' }
      : currentSort.order === 'ascend'
        ? { columnKey, order: 'descend' }
        : null

    if (!isSortControlled) setInternalSort(nextSort)
    // 換了排序方式後，第 3 頁上的是完全不同的資料，回第一頁比較好理解
    if (!isPageControlled) setInternalPage(1)
    emitChange(1, nextSort)
  }

  const toggleAllVisible = () => {
    const nextKeys = allVisibleSelected
      ? selectedRowKeys.filter((key) => !visibleRowKeys.includes(key))
      : [...new Set([...selectedRowKeys, ...visibleRowKeys])]

    rowSelection?.onChange?.(nextKeys)
  }

  const toggleRow = (key: TableRowKey) => {
    const nextKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((selectedKey) => selectedKey !== key)
      : [...selectedRowKeys, key]

    rowSelection?.onChange?.(nextKeys)
  }

  return (
    <div
      ref={ref}
      className={['mds-table', loading ? 'mds-table--loading' : '', className].filter(Boolean).join(' ')}
      aria-busy={loading || undefined}
    >
      <div className="mds-table__scroll">
        <table className="mds-table__element">
          <thead>
            <tr>
              {rowSelection && (
                <th className="mds-table__selection">
                  <Checkbox
                    checked={allVisibleSelected}
                    indeterminate={someVisibleSelected}
                    onChange={toggleAllVisible}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => {
                const key = column.key || column.dataIndex
                const sorted = currentSort && currentSort.columnKey === key ? currentSort.order : undefined

                return (
                  // aria-sort 屬於 columnheader（<th>），不是裡面的 button。
                  // 放在 button 上會被 axe 判為 aria-allowed-attr 違規，螢幕閱讀器也讀不到排序狀態。
                  <th
                    key={key}
                    aria-sort={column.sorter
                      ? (sorted === 'ascend' ? 'ascending' : sorted === 'descend' ? 'descending' : 'none')
                      : undefined}
                  >
                    {column.sorter ? (
                      <button
                        className="mds-table__sort"
                        type="button"
                        onClick={() => toggleSort(column)}
                      >
                        {column.title}
                        <span className="mds-table__sort-indicator">
                          <Icon
                            name={sorted === 'ascend'
                              ? 'chevron-up'
                              : sorted === 'descend' ? 'chevron-down' : 'chevron-up-down'}
                            size={14}
                          />
                        </span>
                      </button>
                    ) : column.title}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {pagedData.map((record, rowIndex) => {
              const key = getRowKey(record, rowKey)

              return (
                <tr key={key}>
                  {rowSelection && (
                    <td className="mds-table__selection">
                      <Checkbox
                        checked={selectedRowKeys.includes(key)}
                        onChange={() => toggleRow(key)}
                        aria-label={`Select row ${key}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => {
                    const value = column.dataIndex ? record[column.dataIndex] : undefined
                    const columnKey = column.key || column.dataIndex

                    return (
                      <td key={columnKey}>
                        {column.render ? column.render(value, record, rowIndex) : value as ReactNode}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {pagedData.length === 0 && (
          <Empty title={emptyText} />
        )}
      </div>
      {loading && <div className="mds-table__loading" role="status">Loading</div>}
      {paginationConfig && total > pageSize && (
        <div className="mds-table__pagination">
          <Pagination
            current={page}
            total={total}
            pageSize={pageSize}
            onChange={changePage}
          />
        </div>
      )}
    </div>
  )
}

/**
 * forwardRef 會把泛型參數抹成 unknown，因此包完之後 cast 回帶 <T> 的函式型別，
 * 保留 columns / dataSource / rowKey 之間的型別推導。
 */
export const Table = forwardRef(TableInner) as <T,>(
  props: TableProps<T> & { ref?: Ref<HTMLDivElement> },
) => ReactElement
