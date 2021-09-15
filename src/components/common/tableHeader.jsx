import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead class="thead-dark">
      <tr>
        {columns.map((column) => (
          <th key={column.label || column.key}>{column.label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
