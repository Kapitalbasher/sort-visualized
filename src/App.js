import React from "react";
import "./App.css";
//Component Imports
import Nav from "./components/nav/nav.js";
import Columns from "./components/columns/columns.js";

function App() {
  return (
    <div className="App">
      <Nav />
      <Columns />
    </div>
  );
}

export default App;
