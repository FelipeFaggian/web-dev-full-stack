import { useState } from 'react'
import './App.css'

function App() {
  
  const [submitHeader, setSubmitHeader] = useState("Hello")

  return (
    <div className="container">
      <h1>{submitHeader}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
       onClick={() => setSubmitHeader ((submitHeader) => submitHeader = "Submitted") }
       onMouseOver={e =>{e.target.style.background = 'black'}}
       onMouseOut={e =>{e.target.style.background = 'white'}}
      >
        Submit
        </button>
    </div>
  );
}

export default App
