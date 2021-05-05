import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ columns, sortedColumn, onSort, tableData }) => {
  return (
    <>
      <table className="table">
        <TableHeader
          columns={columns}
          sortColum={sortedColumn}
          onSort={onSort}
        />
        <TableBody data={tableData} columns={columns} />
      </table>
    </>
  );
};

export default Table;
