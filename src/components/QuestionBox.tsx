import "./QuestionBox.css"
import { useQuestionsStore } from "../store/useQuestionsStore";
import { FormEvent } from "react";

export function QuestionBox(){  
    const {addToQuestions}=useQuestionsStore();  
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const question = form.elements.namedItem("question") as HTMLFormElement
        addToQuestions(question.value);
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