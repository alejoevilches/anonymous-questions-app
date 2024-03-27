import "./QuestionDetails.css"
import { useQuestionsStore } from "../store/useQuestionsStore";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function QuestionDetails(){
  const {questions}=useQuestionsStore()

  const getQuestionFromId=()=>{
    const currentUrl=window.location.href
    const id=currentUrl.split("/").pop();
    return questions.find((q)=>q.id===id)
  }

  const q=getQuestionFromId()

  useEffect(()=>{
    const ogTitleMetaTag = document.querySelector('meta[property="og:title"]');
    const ogDescriptionMetaTag = document.querySelector('meta[property="og:description"]');
    if (ogTitleMetaTag && q){
      ogTitleMetaTag.setAttribute("content", q?.question)
      ogDescriptionMetaTag?.setAttribute("content", "Responde ahora la pregunta")
    }
  },[q])

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