import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import contacts from './Contact'

function Card(props) {
  return(
    <div className="card">
          <div className="top">
            <h2 className='name'>{props.name}</h2>
            <img className='circle-img '
              src={props.imgURL}
              alt="avatar_img"
            />
          </div>
          <div className="bottom">
            <p className='info'>{props.phone}</p>
            <p className='info'>{props.email}</p>
          </div>
      </div>
    )
}

function App() {
  return (
    <>
      <h1 className='heading'>My Contacts</h1>
      <Card
      name={contacts[0].name} 
      imgURL={contacts[0].imgURL}
      phone={contacts[0].phone}
      email={contacts[0].email}
      />
      <Card
      name={contacts[1].name} 
      imgURL={contacts[1].imgURL}
      phone={contacts[1].phone}
      email={contacts[1].email}
      />
      <Card
      name={contacts[2].name} 
      imgURL={contacts[2].imgURL}
      phone={contacts[2].phone}
      email={contacts[2].email}
      />  
    </>
  )
}

export default App
