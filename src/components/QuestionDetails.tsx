import "./QuestionDetails.css"
import { useQuestionsStore } from "../store/useQuestionsStore";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import * as htmlToImage from 'html-to-image';
import { useAdmin } from "../hooks/useAdmin";
import { useCategory } from "../hooks/useCategory";

interface QuestionDetailsState{
  isCopied:boolean,
  answerMode:boolean
}

export function QuestionDetails(){
  const {questions, deleteQuestion, addAnswer}=useQuestionsStore()
  const [state, setState]=useState<QuestionDetailsState>({
    isCopied:false,
    answerMode:false
  })
  const {admin, checkAdmin}=useAdmin()
  const {category, checkCategory}=useCategory();
  const navigation=useNavigate()

  useEffect(()=>{
    checkAdmin()
    checkCategory();
  })

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
            setState({
              ...state,
              isCopied:true
            });
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

  const handleDeleteButton=async()=>{
    const url=window.location.href;
    const id=url.split("/").pop()
    if (id) {
      try {
        await deleteQuestion(id);
        return navigation("/admin")
      } catch (error) {
        console.error("Error al eliminar la pregunta:", error);
      }
    }
  }

  const handleAnswerButton=()=>{
    setState({
      ...state,
      answerMode:true
    })
  }

  const handleAnswerForm=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const id=q?.id;
    const answerInput = e.currentTarget.elements[0] as HTMLInputElement
    const answer=answerInput.value;
    id ? addAnswer(answer, id) : navigation("/admin")
    return navigation("/admin")
  }

  const redirectPage=()=>{
    const isAdmin = admin ? "admin/" : "";
    const categoryPath = category ? `${category}/` : "";
    return `/${categoryPath}${isAdmin}`
  }

  return (
    <main>
      <nav className='nav'>Anonymous Questions App</nav>
      <section className="question-details-container">
        <p className="question-details-title">Pregunta</p>
        <p className="question-details-content">{q?.question}</p>
        {state.answerMode || q?.answer ? 
        <form className="answer-form" onSubmit={handleAnswerForm}>
          <input type="text" className="answer-input visible" placeholder="Ingresá acá tu respuesta" defaultValue={q?.answer}></input>
        </form>
        : ""}
      </section>
      <Link to={redirectPage()}>
        <button className="back-button">Volver al inicio</button>
      </Link>
      <button className="back-button copy-button" onClick={copyQuestionImageToClipboard}>{state.isCopied ? "Copiado!" : "Copiar pregunta en el portapapeles"}</button>
      {admin &&
      <>
        <button className="back-button" onClick={handleDeleteButton}>Eliminar pregunta</button>
        <button className="back-button" onClick={handleAnswerButton}>Responder pregunta</button>
      </>
      }
    </main>
  )
}