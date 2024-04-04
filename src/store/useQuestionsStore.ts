import {create} from "zustand"

interface QuestionsState{
  questions:Question[],
  addToQuestions:(q:string, category:string)=>void
  deleteQuestion:(qId:string)=>void
  addAnswer:(ans:string, qId:string)=>void
}

//Chequear si existen preguntas en el localStorage, y de ser asi, recuperarlas para renderizarlas
const recoverQuestions:()=>Question[]=()=>{
  const savedQuestions=localStorage.getItem("questions")
  return savedQuestions ? JSON.parse(savedQuestions) : []
}

export const useQuestionsStore=create<QuestionsState>((set)=>({
  //Las preguntas
  questions:recoverQuestions(),

  //Logica para agregar las preguntas que se crean al estado global
  addToQuestions:(q:string, category:string)=>set((state)=>{
    const {questions}=state;
    const newQuestion:Question={
      id:crypto.randomUUID(),
      question:q,
      category:category
    }
    const newQuestions=[newQuestion,...questions]
    localStorage.setItem("questions", JSON.stringify(newQuestions))
    console.log(newQuestion);
    return {questions:newQuestions}
  }),

  //Logica para eliminar las preguntas que se deseen borrar del estado global
  deleteQuestion:(qId:string)=>set((state)=>{
    const {questions}=state;
    const i=questions.findIndex(q=>q.id===qId)
    const newQuestions=structuredClone(questions)
    newQuestions.splice(i,1)
    return {questions:newQuestions}
  }),

  //Logica para agregar las respuestas a las preguntas en el estado global
  addAnswer:(ans, qId)=>set((state)=>{
    const {questions}=state;
    const newQuestions=structuredClone(questions);
    const id=newQuestions.findIndex(q=>q.id==qId);
    newQuestions[id].answer=ans;
    console.log(newQuestions)
    return {questions:newQuestions}
  })

}))