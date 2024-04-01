import {create} from "zustand"

interface QuestionsState{
  questions:Question[],
  addToQuestions:(q:string)=>void
  deleteQuestion:(qId:string)=>void
  addAnswer:(ans:string, qId:string)=>void
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
  }),

  deleteQuestion:(qId:string)=>set((state)=>{
    const {questions}=state;
    const i=questions.findIndex(q=>q.id===qId)
    const newQuestions=structuredClone(questions)
    newQuestions.splice(i,1)
    return {questions:newQuestions}
  }),

  addAnswer:(ans, qId)=>set((state)=>{
    const {questions}=state;
    const newQuestions=structuredClone(questions);
    const id=newQuestions.findIndex(q=>q.id==qId);
    newQuestions[id].answer=ans;
    console.log(newQuestions)
    return {questions:newQuestions}
  })

}))