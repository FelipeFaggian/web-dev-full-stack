import React from "react";

function InputArea(props) {
  return (
    <div className="form">
      <input onChange={props.handleChange} name="inputText" type="text" value={props.value}/>
      <button onClick={props.addItem}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
