import React, { useState } from "react";
import "./column.css";

const Column = ({ c }) => {
  const [height, setHeight] = useState(
    () => Math.floor((Math.random() * window.innerHeight) / 2) + 1
  );
  const [selected, setSelected] = useState(false);
  const [blink, setBlink] = useState(false);
  c.height = height;
  c.setHeight = setHeight;
  c.setSelected = setSelected;
  c.selected = selected;
  c.setBlink = setBlink;
  c.blink = blink;
  function checkState(state, className) {
    if (state === true) {
      return className;
    }
    return "";
  }
  return (
    <li
      className={
        checkState(c.selected, "selected") +
        checkState(c.blink, "blink") +
        " column"
      }
      index={c.index}
      style={{
        width: c.width + "px",
        height: c.height + "px",
      }}
    ></li>
  );
};

export default Column;
