import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data }) => {
  return (
    <table className="table table-bordered">
      <TableHeader columns={columns} />

      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
