import { useQuestionsStore } from "../store/useQuestionsStore"
import { Link } from "react-router-dom";
import "./Questions.css"
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect } from "react";

interface QuestionsProps{
  admin:boolean,
  category:string
}

export function Questions({admin, category}:QuestionsProps){
  const {questions, deleteQuestion}=useQuestionsStore();
  
  //Actualizar el local storage cada vez que se crea una nueva pregunta
  useEffect(()=>{
    localStorage.setItem("questions", JSON.stringify(questions))
  },[questions])

  //Handler para eliminar las preguntas si se aprieta el trash icon
  const handleDelete=(id:string)=>{
    deleteQuestion(id)
  }

  const filteredQuestions=category ? questions.filter(q=>q.category===category) : questions

  return (
    <section className="questions">
      {filteredQuestions.map(q=>{
        return (
            <article key={q.id} className="question-card">
              <div className="question-card-header">
                <Link to={admin ? `admin/question/${q.id}` : `question/${q.id}`} key={q.id}>
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