import React from "react";

function CreateArea(props) {
  return (
    <div>
      <form>
        <input onChange={props.titleInput} name="title" placeholder="Title" value={props.titleValue}/>
        <textarea onChange={props.contentInput} name="content" placeholder="Take a note..." value={props.contentValue} rows="3" />
        <button onClick={props.addItem}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
