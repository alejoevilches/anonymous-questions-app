import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { QuestionDetails } from '../components/QuestionDetails'

const categories = ['politica', 'musica', 'programacion', 'deporte']
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
    path:"question/:questionId",
    element:<QuestionDetails />,
  },
    {
      path:"/admin/question/:questionId",
      element:<QuestionDetails />
    }
])
