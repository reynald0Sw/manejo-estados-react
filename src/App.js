import React from "react";
import "./App.css";
// import { ClassState } from "./ClassState";
import { UseState } from "./UseState";
import { UseReducer } from "./UseReducer";

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      {/* <ClassState name="ClassState" /> */}
      <UseReducer name="Use Reducer"/>
    </div>
  );
}

export default App;
