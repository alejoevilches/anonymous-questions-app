import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { QuestionDetails } from '../components/QuestionDetails'

export const Router=createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[{
      path:"/admin",
      element:<App />,
    }
  ]
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