import { useEffect } from 'react'
import './App.css'
import { QuestionBox } from './components/QuestionBox'
import {Questions} from "./components/Questions"
import {Fade} from "react-awesome-reveal"
import { useAdmin } from './hooks/useAdmin'
import { useCategory } from './hooks/useCategory'

function App() {
  const {admin, checkAdmin}=useAdmin()
  const {category, checkCategory}=useCategory()

  useEffect(()=>{
    checkAdmin();
    checkCategory()
  })

  return (
    <main>
      <nav className='nav'>Anonymous Questions App</nav>
      <Fade duration={3000}>
        <QuestionBox category={category ? category : ""} />
        <Fade delay={1000}>
          <Questions admin={admin} category={category ? category : ""} />
        </Fade>
      </Fade>
    </main>
  )
}

export default App
