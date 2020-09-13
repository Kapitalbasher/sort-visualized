import React, { useState } from "react";
import "./App.css";
//Component Imports
import Nav from "./components/nav/nav.js";
import { getColumns } from "./components/columns/column/column.js";
import Columns from "./components/columns/columns.js";
import Information from "./components/information/information.js";
import Sort from "./components/columns/sort.js";
import Footer from "./components/footer/footer.js";

let sort = new Sort();
function App() {
  const [columnList, setColumnList] = useState(getColumns(sort.width));
  sort.setColumnList = setColumnList;
  // new columns on resize
  // React.useEffect(function setupListener() {
  //   function handleResize() {
  //     setColumnList(getColumns(columnWidth));
  //   }
  //   window.addEventListener("resize", handleResize);

  //   return function cleanupListener() {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // });
  return (
    <div className="App">
      <Nav sort={sort} columnList={columnList} setColumnList={setColumnList} />
      <Columns columnList={columnList} setColumnList={setColumnList} />
      <Information sort={sort} />
      <Footer />
    </div>
  );
}
export default App;
