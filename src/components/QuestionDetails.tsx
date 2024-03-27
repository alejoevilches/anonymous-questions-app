import { useQuestionsStore } from "../store/useQuestionsStore";

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
        <p>{q.question}</p>
      </section>
    </main>
  )
}