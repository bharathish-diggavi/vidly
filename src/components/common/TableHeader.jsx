import React from 'react'

const TableHeader = ({columns, sortColum, onSort}) => {
    return (
        <thead>
            <tr>
                {columns.map(column => (<th key={column.path || column.key} onClick={() => onSort(raiseSort(sortColum, column.path))}>{column.label}</th>))}
            </tr>
        </thead>
    )
}

const raiseSort = (sortedColumn, path) => {
    return {
      path,
      order: sortedColumn && sortedColumn.order === "desc" ? "asc" : "desc",
    };
  };

export default TableHeader
