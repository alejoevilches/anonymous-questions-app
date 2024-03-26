import './App.css'
import { QuestionBox } from './components/QuestionBox'
import {Questions} from "./components/Questions"

function App() {
  return (
    <main>
      <nav className='nav'>Anonymous Questions App</nav>
      <QuestionBox />
      <Questions />
    </main>
  )
}

export default App
