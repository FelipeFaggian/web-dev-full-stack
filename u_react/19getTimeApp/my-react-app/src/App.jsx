import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//Challenge:
//1. Given that you can get the current time using:
let time = new Date().toLocaleTimeString();
console.log(time);
//Show the latest time in the <h1> when the Get Time button
//is pressed.

//2. Given that you can get code to be called every second
//using the setInterval method.
//Can you get the time in your <h1> to update every second?

//e.g. uncomment the code below to see Hey printed every second.


function App() {

const [getTime, setTime] = useState("TIME")

setInterval(() => setTime((getTime) => getTime = new Date().toLocaleTimeString()), 1000);

  return (
      <div className="container">
        <h1>{getTime}</h1>
        <button onClick={() => setTime((getTime) => getTime = new Date().toLocaleTimeString()) }>Get Time</button>
      </div>
  )
}

export default App
