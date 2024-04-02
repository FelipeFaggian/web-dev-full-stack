import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ToDoItem from "./components/ToDoItem";
import InputArea from "./components/InputArea";
import './App.css'


//CHALLENGE: I have extracted the Input Area, including the <input> and
//<button> elements into a seperate Component called InputArea.
//Your job is to make the app work as it did before but this time with the
//InputArea as a seperate Component. OK

// DO NOT: Modify the ToDoItem.jsx OK
// DO NOT: Move the input/button elements back into the App.jsx OK

//Hint 1: You will need to think about how to manage the state of the input element
//in InputArea.jsx. OK
//Hint 2: You will need to think about how to pass the input value back into
//the addItem() function in App.jsx. OK

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(e) {
    setInputText(e.target.value);
    console.log(e.target.value);
  }

  function addItem() {
    setItems(prevItems => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea
        handleChange={handleChange}
        addItem={addItem}
        value={inputText}
        />
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
