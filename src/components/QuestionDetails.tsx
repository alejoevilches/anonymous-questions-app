import "./QuestionDetails.css"
import { useQuestionsStore } from "../store/useQuestionsStore";
import { Link } from "react-router-dom";

export function QuestionDetails(){
  const {questions}=useQuestionsStore()

  const getQuestionFromId=()=>{
    const currentUrl=window.location.href
    const id=currentUrl.split("/").pop();
    return questions.find((q)=>q.id===id)
  }

  const q=getQuestionFromId()

  return (
    <main>
      <nav className='nav'>Anonymous Questions App</nav>
      <section className="question-details-container">
        <p className="question-details-title">Pregunta</p>
        <p className="question-details-content">{q?.question}</p>
      </section>
      <Link to={"/"}>
        <button className="back-button">Volver al inicio</button>
      </Link>
    </main>
  )
}