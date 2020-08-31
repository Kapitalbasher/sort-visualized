import React, { useState } from "react";
import "./columns.css";
import sortAlgorithms from "./sort.js";
// @param width in px

const sort = new sortAlgorithms.bubble([5, 10, 1, 9, 2, 8, 3, 7, 4, 6], 1);
console.log(sort.sort());
function getColumns(width) {
  // get absolute value of how many times the specified width fits in 80% of the window

  const amout = (window.innerWidth - window.innerWidth / 5) / width;
  let columnList = { content: [], meta: {} };
  const height = window.innerHeight / 2;
  for (let i = 0; i < amout; i++) {
    columnList.content.push({
      height: Math.floor(Math.random() * height) + 1,
      width: [width],
      index: [i],
      id: "_" + Math.random().toString(36).substr(2, 9),
    });
  }
  columnList.meta["_length"] = columnList.content.length;
  return columnList;
}

const Columns = () => {
  const [columns, setColumns] = useState(columnList);

  setTimeout(() => {
    setColumns(columnList);
  }, 3000);
  // setTimeout(() => {
  //   setColumns(getColumns(columnWidth));
  // }, 2000);
  return (
    <div className="columns-container">
      <ul className="columns-list">
        {columns.content.map((val, index, array) => {
          // reverse array
          let e = array[array.length - 1 - index];
          return (
            <li
              key={e.id}
              index={e.index}
              style={{ width: e.width + "px", height: e.height + "px" }}
            ></li>
          );
        })}
      </ul>
    </div>
  );
};

function getColumnByIndex(index) {
  for (let v of columnList.content) {
    console.log(v.index[0]);
    if (v.index[0] === index) {
      return v;
    }
  }
  return null;
}
setTimeout(() => {
  console.log(columnList);
  let ahead = getColumnByIndex(1);
  let behind = getColumnByIndex(0);
  console.log(ahead.height, behind.height, "wtf");
  const temp = behind.height;
  console.log(temp);
  behind.height = ahead.height;
  ahead.height = temp;
  console.log(ahead.height, behind.height, "wtf");
}, 2000);
const columnWidth = 10;
const columnList = getColumns(columnWidth);
export default Columns;
