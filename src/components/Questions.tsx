import { useQuestionsStore } from "../store/useQuestionsStore"
import { Link } from "react-router-dom";
import "./Questions.css"
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect } from "react";


interface QuestionsProps{
  admin:boolean
}

export function Questions({admin}:QuestionsProps){
  const {questions, deleteQuestion}=useQuestionsStore();

  useEffect(()=>{
    localStorage.setItem("questions", JSON.stringify(questions))
  },[questions])

  const handleDelete=(id:string)=>{
    deleteQuestion(id)
  }

  return (
    <section className="questions">
      {questions.map(q=>{
        return (
            <article key={q.id} className="question-card">
              <div className="question-card-header">
                <Link to={admin ? `admin/question/${q.id}` : `question/${q.id}`} key={q.id}>
                  <p className="question-card-title">Pregunta</p>
                </Link>
                {admin && <FaRegTrashAlt className="trash" onClick={()=>handleDelete(q.id)}/> }
              </div>
              <p className="question-card-info">{q.question}</p>
            </article>
        )
      })}
    </section>
  )
}