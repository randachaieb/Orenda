import React, { Fragment } from "react";
import NavBar from "./NavBar/NavBar";
import "./App.css";
import BodyOrenda from "./BodyOrenda/BodyOrenda";

function App() {
  let name = "hazem";
  return (
    <Fragment>
      <NavBar name={name} />
      <BodyOrenda />
    </Fragment>
  );
}

export default App;
