import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [typeSubmit, setTypeSubmit] = useState("")
  const [otherTypeSubmit, setOtherTypeSubmit] = useState("")
  // const [clickSubmit, setClickSubmit] = useState("")
  

  return (

      <div className="container">
        <h1>Hello, {typeSubmit} {otherTypeSubmit}</h1>
        <input type="text" placeholder="What's your name?" value={typeSubmit} 
        onChange={e => setTypeSubmit(e.target.value)}/>
        <input type="text" placeholder="What's your name?" value={otherTypeSubmit} 
        onChange={e => setOtherTypeSubmit(e.target.value)}/>
        {/* <button onClick={() => setClickSubmit ((clickSubmit) => clickSubmit = typeSubmit)}>Submit</button> */}
        <button>Submit</button>
      </div>

  )
}

export default App
