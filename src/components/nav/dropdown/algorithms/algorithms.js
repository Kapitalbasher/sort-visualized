import React from "react";
import randomID from "../../../randomid.js";
import "./algorithms.css";

const Algorithms = ({
  sort,
  currentAlgorithmName,
  setCurrentAlgorithmName,
  classes,
}) => {
  return (
    <div className={classes}>
      <ul className="algorithms">
        {sort.algorithms.map((val) => {
          return (
            <li key={randomID()}>
              <button
                className={(() => {
                  if (currentAlgorithmName === val.name) {
                    return "underlined";
                  }
                })()}
                onClick={() => {
                  if (sort.currentSort === val.function) return;
                  sort.currentSort = val.function;
                  sort.setInformation(val);
                  sort.stop();
                  setCurrentAlgorithmName(val.name);
                }}
              >
                {val.name.charAt(0).toUpperCase() + val.name.slice(1)}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Algorithms;
