import { forwardRef, useMemo, useState } from 'react'
import type { ForwardedRef, ReactElement, ReactNode, Ref } from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import { Empty } from '../Empty/Empty'
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
  /** true for default string sorting, or a custom compare function. */
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

export interface TableProps<T> {
  /** Column definitions. */
  columns?: TableColumn<T>[]
  /** Row records. */
  dataSource?: T[]
  /** Record field used as the row key, or a function deriving it. */
  rowKey?: Extract<keyof T, string> | ((record: T) => TableRowKey)
  /** Shows the loading overlay. */
  loading?: boolean
  /** Pagination settings; false disables pagination. */
  pagination?: false | { pageSize?: number }
  /** Enables row selection checkboxes. */
  rowSelection?: TableRowSelection
  /** Title of the built-in empty state. */
  emptyText?: ReactNode
  className?: string
}

interface SortState {
  key?: string
  order: 'ascend' | 'descend'
}

const getRowKey = <T,>(record: T, rowKey: Extract<keyof T, string> | ((record: T) => TableRowKey)) => (
  typeof rowKey === 'function' ? rowKey(record) : record[rowKey] as TableRowKey
)

const TableInner = <T,>({
  columns = [],
  dataSource = [],
  rowKey = 'key' as Extract<keyof T, string>,
  loading = false,
  pagination = { pageSize: 5 },
  rowSelection,
  emptyText = 'No data',
  className = '',
}: TableProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
  const [sortState, setSortState] = useState<SortState>()
  const [page, setPage] = useState(1)

  const sortedData = useMemo(() => {
    if (!sortState) return dataSource
    const column = columns.find((item) => (item.key || item.dataIndex) === sortState.key)
    if (!column?.sorter) return dataSource

    return [...dataSource].sort((a, b) => {
      const result = column.sorter === true
        ? String((column.dataIndex && a[column.dataIndex]) ?? '')
            .localeCompare(String((column.dataIndex && b[column.dataIndex]) ?? ''))
        : (column.sorter as (a: T, b: T) => number)(a, b)

      return sortState.order === 'ascend' ? result : -result
    })
  }, [columns, dataSource, sortState])

  const pageSize = (pagination && pagination.pageSize) || 5
  const pagedData = pagination
    ? sortedData.slice((page - 1) * pageSize, page * pageSize)
    : sortedData

  const selectedRowKeys = rowSelection?.selectedRowKeys || []
  const visibleRowKeys = pagedData.map((record) => getRowKey(record, rowKey))
  const allVisibleSelected = visibleRowKeys.length > 0
    && visibleRowKeys.every((key) => selectedRowKeys.includes(key))
  const someVisibleSelected = visibleRowKeys.some((key) => selectedRowKeys.includes(key))
    && !allVisibleSelected

  const toggleSort = (column: TableColumn<T>) => {
    if (!column.sorter) return
    const key = column.key || column.dataIndex

    setSortState((current) => {
      if (!current || current.key !== key) return { key, order: 'ascend' }
      if (current.order === 'ascend') return { key, order: 'descend' }
      return undefined
    })
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
    <div ref={ref} className={['mds-table', loading ? 'mds-table--loading' : '', className].filter(Boolean).join(' ')}>
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
                const sorted = sortState && sortState.key === key ? sortState.order : undefined

                return (
                  <th key={key}>
                    {column.sorter ? (
                      <button
                        className="mds-table__sort"
                        type="button"
                        aria-sort={sorted === 'ascend' ? 'ascending' : sorted === 'descend' ? 'descending' : 'none'}
                        onClick={() => toggleSort(column)}
                      >
                        {column.title}
                        <span className="mds-table__sort-indicator">
                          {sorted === 'ascend' ? 'up' : sorted === 'descend' ? 'down' : 'sort'}
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
      {loading && <div className="mds-table__loading">Loading</div>}
      {pagination && sortedData.length > pageSize && (
        <div className="mds-table__pagination">
          <Pagination
            current={page}
            total={sortedData.length}
            pageSize={pageSize}
            onChange={setPage}
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
