import './App.css'
import { QuestionBox } from './components/QuestionBox'
import {Questions} from "./components/Questions"
import {Fade} from "react-awesome-reveal"

function App() {
  return (
    <main>
      <nav className='nav'>Anonymous Questions App</nav>
      <Fade duration={3000}>
        <QuestionBox />
        <Fade delay={1000}>
          <Questions />
        </Fade>
      </Fade>
    </main>
  )
}

export default App
