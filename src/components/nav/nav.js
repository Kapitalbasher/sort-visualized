import React, { useState } from "react";
import "./nav.css";
import DropDown from "./dropdown/dropdown.js";
import { getColumns } from "./../columns/column/column.js";

let dropChanging = false;
const Nav = ({ columnList, columnWidth, setColumnList, sort }) => {
  const [currentDropDown, setCurrentDropDown] = useState({ menu: "", new: "" });
  const [sorting, setSorting] = useState(sort.sorting);
  sort.array = columnList;
  sort.setSorting = setSorting;
  const updateDropDown = (menu) => {
    let delay = 1000;
    if (window.innerHeight > window.innerWidth) {
      delay = 500;
    }
    var drop_dict = { new: "" };
    if (dropChanging === true) return;
    dropChanging = true;
    // check if menu is the same as last time changed -> if so, hide the menu after the animation is over
    if (currentDropDown.menu === menu) {
      drop_dict.container = "hide";
      drop_dict.new = "";
      drop_dict.menu = menu;
      setCurrentDropDown(drop_dict);
      setTimeout(() => {
        setCurrentDropDown({ menu: "", container: "" });
        dropChanging = false;
      }, delay);
      // if no menu is shown show the clicked menu
    } else if (currentDropDown.menu === "") {
      drop_dict.container = "show";
      drop_dict.menu = menu;
      drop_dict.new = menu;
      setCurrentDropDown(drop_dict);
      setTimeout(() => {
        dropChanging = false;
      }, delay);

      // fade beetween menus if theres a change beetween them
      // if menu not me fade -> if menu me and fade is true, fade
    } else {
      drop_dict.container = "show";
      drop_dict.menu = currentDropDown.menu;
      drop_dict.old = currentDropDown.menu;
      drop_dict.new = menu;
      setCurrentDropDown(drop_dict);
      setTimeout(() => {
        drop_dict.menu = menu;
        setCurrentDropDown({
          menu: drop_dict.menu,
          new: drop_dict.menu,
          container: "show",
        });
        dropChanging = false;
      }, 500);
    }
  };
  return (
    <section className="nav-container">
      <ul>
        <li>
          <button
            className={(() => {
              if (currentDropDown.new === "algorithm") {
                return "underlined";
              }
              return "";
            })()}
            onClick={() => {
              updateDropDown("algorithm");
            }}
          >
            Algorithm
          </button>
        </li>
        <li>
          <button
            className={(() => {
              if (currentDropDown.new === "settings") {
                return "underlined";
              }
            })()}
            onClick={() => {
              updateDropDown("settings");
            }}
          >
            Settings
          </button>
        </li>
        <li>
          <div className="sort-container">
            <button
              className={sorting ? "sorting" : "sort"}
              onClick={() => {
                if (sorting === true) {
                  return;
                }
                if (sort.checkSorted() === true) {
                  setColumnList(getColumns(sort.width));
                } else {
                  sort.sort().then(() => {
                    if (sort.loop === false) {
                      setSorting(false);
                    }
                  });
                  setSorting(true);
                }
              }}
            >
              {sorting ? "Sorting.." : "Sort It!"}
            </button>
          </div>
        </li>
      </ul>
      <DropDown
        sort={sort}
        currentDropDown={currentDropDown}
        setColumnList={setColumnList}
        columnWidth={columnWidth}
      />
    </section>
  );
};
export default Nav;
