//Create a react app from scratch.
import React from "react";
import ReactDom from "react-dom";
//It should display a h1 heading.
//It should display an unordered list (bullet points).
ReactDom.render(
  <div>
    <h1>Felipe's Favorite Foods</h1>
    <ul>
      <li>Carbonara</li>
      <li>Sashimi</li>
      <li>Candy Pie</li>
    </ul>
  </div>,
  document.getElementById("root")
);
