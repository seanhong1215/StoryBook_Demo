import { useMemo, useState } from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import { Empty } from '../Empty/Empty'
import { Pagination } from '../Pagination/Pagination'
import './Table.css'

const getRecordKey = (record, rowKey) => (
  typeof rowKey === 'function' ? rowKey(record) : record[rowKey]
)

export const Table = ({
  columns = [],
  dataSource = [],
  rowKey = 'key',
  loading = false,
  pagination = false,
  rowSelection,
  emptyText = 'No data',
  className = '',
}) => {
  const [sortState, setSortState] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = typeof pagination === 'object' ? pagination.pageSize || 10 : 10

  const selectedRowKeys = rowSelection?.selectedRowKeys || []
  const selectable = Boolean(rowSelection)

  const sortedData = useMemo(() => {
    if (!sortState) return dataSource

    const column = columns.find((item) => (item.key || item.dataIndex) === sortState.key)
    if (!column?.sorter) return dataSource

    return [...dataSource].sort((a, b) => {
      const result = typeof column.sorter === 'function'
        ? column.sorter(a, b)
        : String(a[column.dataIndex] ?? '').localeCompare(String(b[column.dataIndex] ?? ''))

      return sortState.order === 'ascend' ? result : -result
    })
  }, [columns, dataSource, sortState])

  const visibleData = pagination ? sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  ) : sortedData

  const toggleSort = (column) => {
    const key = column.key || column.dataIndex
    if (!column.sorter) return

    setSortState((current) => {
      if (current?.key !== key) return { key, order: 'ascend' }
      if (current.order === 'ascend') return { key, order: 'descend' }
      return undefined
    })
  }

  const toggleRow = (record) => {
    const key = getRecordKey(record, rowKey)
    const nextKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((item) => item !== key)
      : [...selectedRowKeys, key]

    rowSelection?.onChange?.(nextKeys, dataSource.filter((item) => (
      nextKeys.includes(getRecordKey(item, rowKey))
    )))
  }

  const allVisibleSelected = visibleData.length > 0 && visibleData.every((record) => (
    selectedRowKeys.includes(getRecordKey(record, rowKey))
  ))

  const toggleAllVisible = () => {
    const visibleKeys = visibleData.map((record) => getRecordKey(record, rowKey))
    const nextKeys = allVisibleSelected
      ? selectedRowKeys.filter((key) => !visibleKeys.includes(key))
      : Array.from(new Set([...selectedRowKeys, ...visibleKeys]))

    rowSelection?.onChange?.(nextKeys, dataSource.filter((item) => (
      nextKeys.includes(getRecordKey(item, rowKey))
    )))
  }

  return (
    <div className={['table', loading ? 'table--loading' : '', className].filter(Boolean).join(' ')}>
      <div className="table__scroll">
        <table className="table__element">
          <thead>
            <tr>
              {selectable && (
                <th className="table__selection">
                  <Checkbox
                    checked={allVisibleSelected}
                    indeterminate={selectedRowKeys.length > 0 && !allVisibleSelected}
                    onChange={toggleAllVisible}
                  />
                </th>
              )}
              {columns.map((column) => {
                const key = column.key || column.dataIndex
                const sorted = sortState?.key === key ? sortState.order : undefined

                return (
                  <th key={key}>
                    {column.sorter ? (
                      <button
                        className="table__sort"
                        type="button"
                        onClick={() => toggleSort(column)}
                      >
                        {column.title}
                        <span className="table__sort-indicator">
                          {sorted === 'ascend' ? '↑' : sorted === 'descend' ? '↓' : '↕'}
                        </span>
                      </button>
                    ) : column.title}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {visibleData.map((record, rowIndex) => {
              const key = getRecordKey(record, rowKey)

              return (
                <tr key={key}>
                  {selectable && (
                    <td className="table__selection">
                      <Checkbox
                        checked={selectedRowKeys.includes(key)}
                        onChange={() => toggleRow(record)}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key || column.dataIndex}>
                      {column.render
                        ? column.render(record[column.dataIndex], record, rowIndex)
                        : record[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
        {visibleData.length === 0 && (
          <Empty title={emptyText} description="Try changing filters or creating a new item." />
        )}
      </div>
      {pagination && sortedData.length > pageSize && (
        <div className="table__pagination">
          <Pagination
            current={currentPage}
            total={sortedData.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}
