import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Profile from "./components/Profile";
import CreateJobAd from "./components/CreateJobAd";
import myC from "./components/myC";
import NumberPlateComponent from "./components/CheckPlateBoxComponent";

function App() {
  // const user = {
  //   firstName: "Bonhaeng",
  //   lastName: "Lee",
  // };

  function sd(sch, dch) {
    // sch && 
    console.log(sch, dch);
  }

  function textsd(sch) {
    // sch && 
    console.log(sch);
  }

  return (
    <div>
      <Profile output={sd} toutput={textsd}/>
    </div>
  );
}

export default App;
