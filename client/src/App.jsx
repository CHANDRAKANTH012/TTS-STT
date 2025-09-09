import { useState } from 'react'

import './App.css'
import TTSApp from './Components/TTSApp.jsx'
import Home from './pages/Home.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'

function App() {


  return (
    <>
      <Navbar/>
      <Home/>
      <Footer/>
    </>
  )
}

export default App
