import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

var numbers = [3, 56, 2, 48, 5];

////Map -Create a new array by doing something with each item in an array.
// const newNumbers = numbers.map( x => x * 2);

//////Filter - Create a new array by keeping the items that return true.
// const newNumbers = numbers.filter(num => num < 10);

//Reduce - Accumulate a value by doing something to each item in an array.
// var newNumber = numbers.reduce( (accumulator, currentNumber) => accumulator + currentNumber);


////Find - find the first item that matches from an array.
// const newNumber = numbers.find( num => num > 10);

////FindIndex - find the index of the first item that matches.
// const newNumber = numbers.findIndex( num => num > 10);
// console.log(newNumber);


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
