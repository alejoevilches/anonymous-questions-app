import {create} from "zustand"

interface QuestionsState{
  questions:Question[],
  addToQuestions:(q:string)=>void
}

const recoverQuestions:()=>Question[]=()=>{
  const savedQuestions=localStorage.getItem("questions")
  return savedQuestions ? JSON.parse(savedQuestions) : []
}

export const useQuestionsStore=create<QuestionsState>((set)=>({
  questions:recoverQuestions(),

  addToQuestions:(q:string)=>set((state)=>{
    const {questions}=state;
    const newQuestion:Question={
      id:crypto.randomUUID(),
      question:q,
    }
    const newQuestions=[newQuestion,...questions]
    localStorage.setItem("questions", JSON.stringify(newQuestions))
    return {questions:newQuestions}
  })

}))