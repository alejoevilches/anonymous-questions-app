import { useQuestionsStore } from "../store/useQuestionsStore"
import { Link } from "react-router-dom";
import "./Questions.css"

export function Questions(){
  const {questions}=useQuestionsStore();
  return (
    <section className="questions">
      {questions.map(q=>{
        return (
          <Link to={`/question/${q.id}`}>
            <article className="question-card">
              <p className="question-card-title">Pregunta</p>
              <p className="question-card-info">{q.question}</p>
            </article>
          </Link>
        )
      })}
    </section>
  )
}