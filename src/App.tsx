import { useEffect } from 'react'
import './App.css'
import { QuestionBox } from './components/QuestionBox'
import {Questions} from "./components/Questions"
import {Fade} from "react-awesome-reveal"
import { useAdmin } from './hooks/useAdmin'

function App() {
  const {admin, checkAdmin}=useAdmin()

  useEffect(()=>{
    checkAdmin()
  })

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
