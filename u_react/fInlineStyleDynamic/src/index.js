import React from "react";
import ReactDOM from "react-dom";

const dynamicTitle = {
  color: "red",
  content: "Divisible by 3, 5, 7, or 11",
};

const second = new Date().getSeconds();

if (second % 2 === 0) {
  dynamicTitle.color = "blue";
  dynamicTitle.content = "Second pair";
} else {
  dynamicTitle.color = "red";
  dynamicTitle.content = "Second odd";
}

ReactDOM.render(
  <h1 style={dynamicTitle}>{dynamicTitle.content}</h1>,
  document.getElementById("root")
);
