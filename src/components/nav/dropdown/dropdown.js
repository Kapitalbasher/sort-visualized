import React, { useState } from "react";
import "./dropdown.css";
//menus
import Settings from "./settings/settings.js";
import Algorithms from "./algorithms/algorithms.js";

const DropDown = ({ currentDropDown, sort, setColumnList }) => {
  // const []
  const [currentAlgorithmName, setCurrentAlgorithmName] = useState("bubble");
  const [freezed, setFreezed] = useState(false);
  const [sliderSpeed, setSliderSpeed] = useState(sort.speed);
  const [sliderWidth, setSliderWidth] = useState(sort.width);
  // const []
  sort.setFreezed = setFreezed;
  sort.speed = sliderSpeed;
  sort.width = sliderWidth;
  const checkFade = (menu) => {
    if (currentDropDown.old === undefined) return "fade-in";
    if (currentDropDown.old === menu) {
      return "fade-out";
    } else {
      return "fade-in";
    }
  };
  return (
    <div className={"DropDown " + currentDropDown.container}>
      {(() => {
        if (currentDropDown.menu === "algorithm") {
          return (
            <Algorithms
              currentAlgorithmName={currentAlgorithmName}
              setCurrentAlgorithmName={setCurrentAlgorithmName}
              sort={sort}
              classes={checkFade("algorithm")}
            />
          );
        } else if (currentDropDown.menu === "settings") {
          return (
            <Settings
              sort={sort}
              setColumnList={setColumnList}
              freezed={freezed}
              setFreezed={setFreezed}
              sliderSpeed={sliderSpeed}
              setSliderSpeed={setSliderSpeed}
              sliderWidth={sliderWidth}
              setSliderWidth={setSliderWidth}
              classes={checkFade("settings")}
            />
          );
        }
      })()}
    </div>
  );
};

export default DropDown;
