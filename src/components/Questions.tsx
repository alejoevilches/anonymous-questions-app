import { useQuestionsStore } from "../store/useQuestionsStore"
import { Link } from "react-router-dom";
import "./Questions.css"
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface QuestionsProps{
  admin:boolean,
  category:string
}

export function Questions({admin, category}:QuestionsProps){
  const {questions, deleteQuestion}=useQuestionsStore();
  const location=useLocation()

  //Filtrar las preguntas por categoria (si es que existe una categoria)
  const filterQuestions=()=>{
    return category ? questions.filter(q=>q.category===category) : questions
  }
  
  //Actualizar el local storage cada vez que se crea una nueva pregunta
  useEffect(()=>{
    localStorage.setItem("questions", JSON.stringify(questions))
  },[questions, location])

  //Handler para eliminar las preguntas si se aprieta el trash icon
  const handleDelete=(id:string)=>{
    deleteQuestion(id)
  }

  //Funcion para crear la redireccion a las rutas segun si es admin o si está en alguna categoria
  const redirectPage = (q: Question): string => {
    const isAdmin = admin ? "admin/" : "";
    const categoryPath = category ? `${category}/` : "";
    return `${categoryPath}${isAdmin}question/${q.id}`;
  };

  return (
    <section className="questions">
      {filterQuestions().map(q=>{
        return (
            <article key={q.id} className="question-card">
              <div className="question-card-header">
                <Link to={redirectPage(q)} key={q.id}>
                  <p className="question-card-title">Pregunta</p>
                </Link>
                {admin && <FaRegTrashAlt className="trash" onClick={()=>handleDelete(q.id)}/> }
              </div>
              <p className="question-card-info">{q.question}</p>
              {q.answer && <p className="question-card-answer">{q.answer}</p>}
            </article>
        )
      })}
    </section>
  )
}