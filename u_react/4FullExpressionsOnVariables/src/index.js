//Create a react app from scratch.
import React from "react";
import ReactDOM from "react-dom";
//It should display 2 paragraph HTML elements.
//The paragraphs should say:
//Created by YOURNAME.
//Copyright CURRENTYEAR.
//E.g.
//Created by Angela Yu.
//Copyright 2019.
const year = new Date().getFullYear();
const owner = "Felipe Faggian";
ReactDOM.render(
  <div>
    <p>Created by {owner}.</p>
    <p>Copyright {year}.</p>
  </div>,
  document.getElementById("root")
);
