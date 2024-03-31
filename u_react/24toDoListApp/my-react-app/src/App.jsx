import { useState } from 'react'
import './App.css'
import ToDoList from './components/ToDoList';

//CHALLENGE: Make this app work by applying what you've learnt.
//1. When new text is written into the input, its state should be saved.
//2. When the add button is pressed, the current data in the input should be
//added to an array.
//3. The <ul> should display all the array items as <li>s

function App() {
  const [item, setItem] = useState("");
  const [clickSubmit, setClickSubmit] = useState([]);

  return (
    <div className="container">
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <div className="form">
          <input type="text" name='item' onChange={e => setItem(e.target.value)} value={item}/>
          <button onClick={() => {
              setClickSubmit([
              ...clickSubmit,
              { id: (clickSubmit.length), item: item, lineStrike: true }
          ]);
          setItem('')}}
          >Add
          </button>
        </div>
        <div>
        <ul>
          {clickSubmit.map(e => (
            <ToDoList key={e.id} id={e.id} item={e.item} lineStrike={e.lineStrike}/>
          ))}
          
        </ul>
        </div>
    </div>
  )
}

export default App
