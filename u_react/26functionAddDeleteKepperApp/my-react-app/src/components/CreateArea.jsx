import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

function CreateArea(props) {

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => true);
  };

  return (
    <div>
      <form>
        {checked ? <Zoom in={checked}><input onChange={props.titleInput} name="title" placeholder="Title" value={props.titleValue}/></Zoom> : ""}
        <textarea onClick={handleChange}  onChange={props.contentInput} name="content" placeholder="Take a note..." value={props.contentValue} rows={ checked ? "3" : "1"} />
        {checked ? <button onClick={props.addItem}><AddIcon /></button> : ""}
      </form>
    </div>
  );
}

export default CreateArea;
