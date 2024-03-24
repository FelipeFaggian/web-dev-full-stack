//Create a React app from scratch.
import React from "react";
import ReactDOM from "react-dom";
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.
const greetings = {
  color: "red",
  content: "Good Morning",
};

const d = new Date();
let hour = d.getHours();

if (hour < 12) {
  greetings.content = "Good Morning";
  greetings.color = "red";
} else if (hour < 18) {
  greetings.content = "Good Afternoon";
  greetings.color = "green";
} else {
  greetings.content = "Good Evening";
  greetings.color = "blue";
}

ReactDOM.render(
  <div>
    <h1 className="heading" style={{ color: greetings.color }}>
      {greetings.content}
    </h1>
  </div>,
  document.getElementById("root")
);
