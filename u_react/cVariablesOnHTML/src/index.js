import React from "react";
import ReactDOM from "react-dom";

const firstName = "Felipe";
const lastName = "Faggian";
const number = 1;

ReactDOM.render(
  <div>
    <h1>
      Hello, {firstName} {lastName}!
    </h1>
    <p>
      Seems like your lucky number is: <strong>{number}</strong>
    </p>
  </div>,
  document.getElementById("root")
);
