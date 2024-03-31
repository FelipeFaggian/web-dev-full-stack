import { useState } from 'react'
import './App.css'

//CHALLENGE: Make this app work by applying what you've learnt.
//1. When new text is written into the input, its state should be saved.
//2. When the add button is pressed, the current data in the input should be
//added to an array.
//3. The <ul> should display all the array items as <li>s

function App() {

  let nextId = 0;

  const [item, setItem] = useState("");

  const [clickSubmit, setClickSubmit] = useState([]);

  return (
    <div className="container">
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <div className="form">
          <input type="text" name='item' onChange={e => setItem(e.target.value)} value={item}/>
          <button onClick={(e) => {
            setClickSubmit([
              ...clickSubmit,
              { id: nextId++, item: item }
            ]);
            setItem('')
            }}
          >Add
          </button>
        </div>
        <div>
        <ul>
          {clickSubmit.map(e => (
            <li key={e.id}>{e.item}</li>
          ))}
        </ul>
        </div>
    </div>
  )
}

export default App
