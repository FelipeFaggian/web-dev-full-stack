import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import contacts from './Contact'
import Card from './Card'
import Avatar from './Avatar'

function createCard(contact) {
  return (
    <Card
      key={contact.id}
      name={contact.name}
      id={contact.id}
      imgURL={contact.imgURL}
      phone={contact.phone}
      email={contact.email}
    />
  )
}

function App() {

  return (
    <>
      <h1 className='heading'>My Contacts</h1>
      <Avatar imgURL={'https://pbs.twimg.com/profile_images/1523987597751726081/XuQeo7gC_400x400.jpg'} />
      {contacts.map(createCard)}
      {/* <Card
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
      />   */}
    </>
  )
}

export default App
