import "./QuestionDetails.css"
import { useQuestionsStore } from "../store/useQuestionsStore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as htmlToImage from 'html-to-image';

export function QuestionDetails(){
  const {questions}=useQuestionsStore()
  const [isCopied, setIsCopied]=useState(false)

  const getQuestionFromId=()=>{
    const currentUrl=window.location.href
    const id=currentUrl.split("/").pop();
    return questions.find((q)=>q.id===id)
  }

  const copyQuestionImageToClipboard = () => {
    const questionDetailsNode = document.querySelector(".question-details-container");
  
    htmlToImage.toBlob(questionDetailsNode as HTMLElement, {height:200})
      .then(function (blob) {
        if (blob !== null) {
          navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
            .then(function () {
              console.log("La pregunta se ha copiado correctamente al portapapeles.");
            }).catch(function (error) {
              console.error("Error al copiar la pregunta al portapapeles:", error);
            });
            setIsCopied(true);
        }
      })
      .catch(function (error) {
        console.error("Ocurrió un error al generar la imagen:", error);
      });
  };
  
  const q = getQuestionFromId();

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
      <button className="back-button copy-button" onClick={copyQuestionImageToClipboard}>{isCopied ? "Copiado!" : "Copiar pregunta en el portapapeles"}</button>
    </main>
  )
}