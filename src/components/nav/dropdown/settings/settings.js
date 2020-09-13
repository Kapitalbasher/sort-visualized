import React from "react";
import { getColumns } from "../../../columns/column/column.js";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
  mobile: {
    width: "25vw",
  },
});

const Settings = (props) => {
  const classes = useStyles();
  const sort = props.sort;
  let labelSize = { fontSize: "calc(15px + 0.75vw)" };
  let marksSpeed = [];
  let marksWidth = [];
  if (window.innerHeight < window.innerWidth) {
    labelSize.fontSize = "calc(10px + 0.75vw)";
    marksSpeed = [
      {
        value: 0.25,
        label: "slow",
      },
      {
        value: 100,
        label: "fast",
      },
    ];
    marksWidth = [
      {
        value: 3,
        label: "small",
      },
      {
        value: 150,
        label: "big",
      },
    ];
  }
  return (
    <div className={props.classes}>
      <form
        className={"form-speed " + classes.root + classes.mobile}
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
      <FormControlLabel
        value="Freeze"
        control={
          <Checkbox
            disabled={!sort.sorting}
            checked={props.freezed}
            value={"Freeze"}
            onClick={() => {
              if (sort.sorting === false) return;
              if (sort.animations[0] === undefined) {
                if (sort.freezeCallback !== undefined) {
                  sort.freezeCallback();
                  sort.freezeCallback = undefined;
                }
              } else {
                if (sort.animations[0].playState === "paused") {
                  sort.continueAnimations();
                } else {
                  sort.pauseAnimations();
                }
              }
              props.setFreezed(!props.freezed);
            }}
          />
        }
        label={<span style={{ labelSize }}>Freeze</span>}
        labelPlacement="end"
      >
        {" "}
      </FormControlLabel>

      <FormControlLabel
        value="loop"
        control={
          <Checkbox
            checked={sort.loop}
            value={"loop"}
            onClick={() => {
              props.setLoop(!sort.loop);
            }}
          />
        }
        label={<span style={labelSize}>Loop</span>}
        labelPlacement="end"
      ></FormControlLabel>
      <button
        className="resort"
        onClick={async () => {
          sort.abruptStop();
          props.setColumnList(getColumns(sort.width));
          props.setFreezed(false);
          document
            .querySelector(".resort")
            .animate(
              [{ transform: `rotate(0)` }, { transform: `rotate(360deg)` }],
              {
                // timing options
                duration: 500,
                iterations: 1,
                easing: "ease",
              }
            );
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
