import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import Footer from './components/Footer'
import Note from './components/Note'
import notes from './components/Description'

function App() {

  return (
    <div>
      <Header />     
        {notes.map(Note)}  
      <Footer />
    </div>
  )
}

export default App
