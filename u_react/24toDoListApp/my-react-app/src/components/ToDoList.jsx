import { useState } from 'react'

function ToDoList(props) {
  const [isHovered, setIsHovered] = useState(false);
  return ( <li key={props.id} onClick={ () => setIsHovered(!isHovered) } style={{ textDecoration: isHovered ? 'line-through' : 'none'}}> {props.item} </li> );
}

export default ToDoList;
