import React from "react";
import { getColumns } from "../../../columns/column/column.js";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import "./settings.css";

const useStyles = makeStyles({
  root: {
    width: "15%",
  },
  input: {
    width: "30%",
    marginLeft: 10,
  },
});

const Settings = (props) => {
  const classes = useStyles();
  const sort = props.sort;
  const marksSpeed = [
    {
      value: 0.25,
      label: "slow",
    },
    {
      value: 100,
      label: "fast",
    },
  ];
  const marksWidth = [
    {
      value: 3,
      label: "small",
    },
    {
      value: 150,
      label: "big",
    },
  ];
  return (
    <div className={props.classes}>
      <form
        className={"form-speed " + classes.root}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="combine">
          <div className="container-slider">
            <label htmlFor="SortSpeed">Speed</label>
            <Slider
              value={props.sliderSpeed}
              aria-labelledby="discrete-slider"
              step={5}
              min={0.25}
              marks={marksSpeed}
              max={100}
              onChange={(event, value) => {
                props.setSliderSpeed(value);
                sort.changePlaybackRate(value);
              }}
            />
          </div>
          <div className="container-input">
            <Input
              className={classes.input}
              value={props.sliderSpeed}
              margin="dense"
              type="number"
              inputProps={{
                step: 0.25,
                min: 0.25,
                max: 500,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (isNaN(value === true)) return;
                props.setSliderSpeed(value);
                sort.changePlaybackRate(value);
              }}
            />
          </div>
        </div>
      </form>
      <button
        onClick={() => {
          if (sort.sorting === false) return;
          if (sort.animations[0].playState === "paused") {
            sort.continueAnimations();
          } else {
            sort.pauseAnimations();
          }
          props.setFreezed(!props.freezed);
        }}
      >
        {props.freezed ? "Unfreeze" : "Freeze"}
      </button>
      {/* <button
        onClick={() => {
          sort.sorting = false;
        }}
      >
        Stop
      </button> */}
      <button
        onClick={async () => {
          sort.abruptStop();
          props.setColumnList(getColumns(sort.width));
          props.setFreezed(false);
        }}
      >
        Resort
      </button>

      <form className={classes.root}>
        <label htmlFor="ColumnWidth">Width</label>

        <Slider
          value={props.sliderWidth}
          aria-labelledby="discrete-slider"
          marks={marksWidth}
          step={5}
          min={3}
          max={150}
          onChange={(event, value) => {
            sort.abruptStop();
            props.setColumnList(getColumns(value));
            props.setSliderWidth(value);
            sort.setFreezed(false);
          }}
        />
      </form>
    </div>
  );
};
export default Settings;
