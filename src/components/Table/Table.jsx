import { useMemo, useState } from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import { Empty } from '../Empty/Empty'
import { Pagination } from '../Pagination/Pagination'
import './Table.css'

const getRowKey = (record, rowKey) => (
  typeof rowKey === 'function' ? rowKey(record) : record[rowKey]
)

export const Table = ({
  columns = [],
  dataSource = [],
  rowKey = 'key',
  loading = false,
  pagination = { pageSize: 5 },
  rowSelection,
  emptyText = 'No data',
  className = '',
}) => {
  const [sortState, setSortState] = useState()
  const [page, setPage] = useState(1)

  const sortedData = useMemo(() => {
    if (!sortState) return dataSource
    const column = columns.find((item) => (item.key || item.dataIndex) === sortState.key)
    if (!column?.sorter) return dataSource

    return [...dataSource].sort((a, b) => {
      const result = column.sorter(a, b)
      return sortState.order === 'ascend' ? result : -result
    })
  }, [columns, dataSource, sortState])

  const pageSize = pagination?.pageSize || 5
  const pagedData = pagination
    ? sortedData.slice((page - 1) * pageSize, page * pageSize)
    : sortedData

  const selectedRowKeys = rowSelection?.selectedRowKeys || []
  const visibleRowKeys = pagedData.map((record) => getRowKey(record, rowKey))
  const allVisibleSelected = visibleRowKeys.length > 0
    && visibleRowKeys.every((key) => selectedRowKeys.includes(key))
  const someVisibleSelected = visibleRowKeys.some((key) => selectedRowKeys.includes(key))
    && !allVisibleSelected

  const toggleSort = (column) => {
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

  const toggleRow = (key) => {
    const nextKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((selectedKey) => selectedKey !== key)
      : [...selectedRowKeys, key]

    rowSelection?.onChange?.(nextKeys)
  }

  return (
    <div className={['table', loading ? 'table--loading' : '', className].filter(Boolean).join(' ')}>
      <div className="table__scroll">
        <table className="table__element">
          <thead>
            <tr>
              {rowSelection && (
                <th className="table__selection">
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
                const sorted = sortState?.key === key ? sortState.order : undefined

                return (
                  <th key={key}>
                    {column.sorter ? (
                      <button
                        className="table__sort"
                        type="button"
                        aria-sort={sorted || 'none'}
                        onClick={() => toggleSort(column)}
                      >
                        {column.title}
                        <span className="table__sort-indicator">
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
                    <td className="table__selection">
                      <Checkbox
                        checked={selectedRowKeys.includes(key)}
                        onChange={() => toggleRow(key)}
                        aria-label={`Select row ${key}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => {
                    const value = record[column.dataIndex]
                    const columnKey = column.key || column.dataIndex

                    return (
                      <td key={columnKey}>
                        {column.render ? column.render(value, record, rowIndex) : value}
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
      {loading && <div className="table__loading">Loading</div>}
      {pagination && sortedData.length > pageSize && (
        <div className="table__pagination">
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
