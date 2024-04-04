import { useEffect } from 'react'
import './App.css'
import { QuestionBox } from './components/QuestionBox'
import {Questions} from "./components/Questions"
import {Fade} from "react-awesome-reveal"
import { useAdmin } from './hooks/useAdmin'
import { useCategory } from './hooks/useCategory'
import { categories } from './utils/constants'
import { Link, useLocation } from 'react-router-dom'

function App() {
  const {admin, checkAdmin}=useAdmin()
  const {category, checkCategory}=useCategory()
  const location=useLocation()

  //Por unica vez, cuando iniciamos la app, chequear si estamos en admin o en alguna categoria
  useEffect(()=>{
    checkAdmin();
    checkCategory()
  },[checkAdmin, checkCategory, location, category])

  //Formatear el texto de las categorias para que quede bien en los botones.
  const formattedCategories=categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1));

  return (
    <main>
      <nav className='nav'>Anonymous Questions App</nav>
      <Fade duration={3000}>
        <QuestionBox category={category ? category : ""} />
        <div className='categories'>
        <Link to={admin ? `/admin` : ""}><button className='category-button'>General</button></Link>
          {formattedCategories.map(cat=>{
            return (
              <Link to={admin ? `${cat.toLowerCase()}/admin/` : `/${cat.toLowerCase()}`}>
                <button className='category-button'>{cat}</button>
              </Link>
            )
          })}
        </div>
        <Fade delay={1000}>
          <Questions admin={admin} category={category ? category : ""} />
        </Fade>
      </Fade>
    </main>
  )
}

export default App
