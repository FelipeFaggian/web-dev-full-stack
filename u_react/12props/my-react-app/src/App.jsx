import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Card(props) {
  return(
  <div>
    <h2>{props.name}</h2>
    <img
      src={props.img}
      alt="avatar_img"
    />
    <p>{props.tell}</p>
    <p>{props.email}</p>
  </div> 
  );
}

function App() {
  return (
    <>
      
      <h1>My Contacts</h1>

      <Card 
      name="Beyonce" 
      img="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg" 
      tell="+123 456 789"
      email="b@beyonce.com"/>

      <Card 
      name="Jack Bauer" 
      img="https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg" 
      tell="+987 654 321"
      email="jack@nowhere.com"/>   

      <Card 
      name="Chuck Norris" 
      img="https://i.pinimg.com/originals/e3/94/47/e39447de921955826b1e498ccf9a39af.png" 
      tell="+918 372 574"
      email="gmail@chucknorris.com"/>        

    </>
  )
}

export default App
