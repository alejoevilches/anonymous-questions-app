import { useEffect, useState } from 'react'
import './App.css'
import { QuestionBox } from './components/QuestionBox'
import {Questions} from "./components/Questions"
import {Fade} from "react-awesome-reveal"

function App() {
  const [admin, setAdmin]=useState(false);

  const checkAdmin=()=>{
    const url=window.location.href;
    if (url.split("/").pop()==="admin"){
      setAdmin(true);
    }
  }

  useEffect(()=>{
    checkAdmin()
  },[])

  return (
    <main>
      <nav className='nav'>Anonymous Questions App</nav>
      <Fade duration={3000}>
        <QuestionBox />
        <Fade delay={1000}>
          <Questions admin={admin} />
        </Fade>
      </Fade>
    </main>
  )
}

export default App
