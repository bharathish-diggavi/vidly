import React from "react";

const TableHeader = ({ columns, sortColum, onSort }) => {
  const renderSortIcon = (column) => {
    if (column.path !== sortColum.path) return null;
    return sortColum.order === "asc" ? (
      <i className="fa fa-sort-asc" aria-hidden="true"></i>
    ) : (
      <i className="fa fa-sort-desc" aria-hidden="true"></i>
    );
  };
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            style={{ cursor: "pointer" }}
            key={column.path || column.key}
            onClick={() => onSort(raiseSort(sortColum, column.path))}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const raiseSort = (sortedColumn, path) => {
  return {
    path,
    order: sortedColumn && sortedColumn.order === "desc" ? "asc" : "desc",
  };
};

export default TableHeader;
