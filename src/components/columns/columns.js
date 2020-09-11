import React from "react";
import "./columns.css";
import ColumnComponent from "./column/column_component.js";

const Columns = ({ columnList }) => {
  return (
    <div className="columns-container">
      <ul className="columns-list">
        {columnList.map((val, index, array) => {
          // reverse array
          let column = array[array.length - 1 - index];
          return <ColumnComponent c={column} key={column.id} />;
        })}
      </ul>
    </div>
  );
};
export default Columns;
