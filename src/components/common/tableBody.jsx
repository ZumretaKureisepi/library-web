import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.name);
  };

  //   createKey = (item, column) => {
  //     return item._id + (column.path || column.key);
  //   };

  return (
    <tbody>
      {data.map((item) => {
        return (
          <tr>
            {columns.map((column) => (
              <td key={column.name || column.key}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
