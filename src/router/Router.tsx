import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { QuestionDetails } from '../components/QuestionDetails'
import { categories } from '../utils/constants'

//Funcion que crea dinamicamente la ruta de las categorias, por si en el futuro queremos agregar mas
const categoryRoutes=categories.map((cat)=>{
  return {
    path:`/${cat}`,
    element:<App />,
    children:[
      {
        path:`/${cat}/admin`,
        element:<App />,
      },
    ]
  }
})


export const Router=createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      ...categoryRoutes,
      {
        path:"/admin",
        element:<App />
      }
    ]
  },
  {
    path:":category/question/:questionId",
    element:<QuestionDetails />,
  },
  {
    path:":category/admin/question/:questionId",
    element:<QuestionDetails />,
  },
  {
    path:"question/:questionId",
    element:<QuestionDetails />,
  },
    {
      path:"/admin/question/:questionId",
      element:<QuestionDetails />
    }
])
