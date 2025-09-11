
import './App.css'
import Home from './pages/Home.jsx'
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import History from './pages/History.jsx'
import TTS from './pages/TTS.jsx'
import STT from './pages/STT.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx';

function App() {


  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tts' element={<TTS/>}/>
        <Route path='/stt' element={<STT/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
      </Routes>
      
    </>
  )
}

export default App
