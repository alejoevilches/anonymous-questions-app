import "./QuestionBox.css"

export function QuestionBox(){
    return (
        <form className="question-container">
            <div className="question-info">
                <label className="question-title" htmlFor="question">Ingresá tu pregunta</label>
                <input type="text" name="question" id="question" />
            </div>
            <button className="question-button" type="submit">Enviar pregunta</button>
        </form>
    )
}