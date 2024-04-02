import "./QuestionBox.css"
import { useQuestionsStore } from "../store/useQuestionsStore";
import { FormEvent } from "react";

interface QuestionBoxProps{
    category:string
}

export function QuestionBox({category}:QuestionBoxProps){  
    const {addToQuestions}=useQuestionsStore();

    
    //Handler del submit, que manda toda la info al store de las preguntas para agregarlas.
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const question = form.elements.namedItem("question") as HTMLFormElement
        addToQuestions(question.value, category);
    }

    return (
        <form className="question-container" onSubmit={handleSubmit}>
            <div className="question-info">
                <label className="question-title" htmlFor="question">Ingresá tu pregunta</label>
                <input type="text" name="question" id="question" autoComplete="off"/>
            </div>
            <button className="question-button" type="submit">Enviar pregunta</button>
        </form>
    )
}