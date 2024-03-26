import "./QuestionBox.css"

export function QuestionBox(){
    return (
        <form className="question-container">
            <label className="question-title" htmlFor="question">Ingresá tu pregunta</label>
            <input type="text" name="question" id="question" />
        </form>
    )
}