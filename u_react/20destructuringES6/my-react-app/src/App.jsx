import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import cars from './components/practice'
import './App.css'

// CHALLENGE: uncomment the code below and see the car stats rendered
// );




function App() {

let tesla = cars[1];
let teslaTopSpeed = tesla.speedStats.topSpeed;
let teslaTopColour = tesla.coloursByPopularity;
let honda = cars[0];
let hondaTopSpeed = honda.speedStats.topSpeed;
let hondaTopColour = honda.coloursByPopularity;

  return (
   <div>
      <table>
        <tr>
          <th>Brand</th>
          <th>Top Speed</th>
        </tr>
        <tr>
          <td>{tesla.model}</td>
          <td>{teslaTopSpeed}</td>
          <td>{teslaTopColour}</td>
        </tr>
        <tr>
          <td>{honda.model}</td>
          <td>{hondaTopSpeed}</td>
          <td>{hondaTopColour}</td>
        </tr>
      </table>
   </div>
  )
}

export default App
