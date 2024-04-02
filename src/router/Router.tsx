import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { QuestionDetails } from '../components/QuestionDetails'

interface Params{
  category:string
}

const validCategories = ["politica", "deportes", "programacion", "musica"];


const validateCategory = ({ category }: Params): JSX.Element | null => {
  if (validCategories.includes(category)) {
    return <App />;
  }
  return <App/>;
};

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
    path: "/:category",
    element: ({ params }) => validateCategory(params as Params)
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
