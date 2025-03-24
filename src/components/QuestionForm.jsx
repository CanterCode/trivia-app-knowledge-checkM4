import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import he from "he";
import "./cssQuesForm.css"


function QuestionForm({ formData }) {
    const [question, setQuestion] = useState(null);
    const [answers, setanswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userAnswer, setUserAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`);

                const data = await response.json();
                
                setQuestion(data.results[0]);
                setanswers([...data.results[0].incorrect_answers, data.results[0].correct_answer].sort(() => Math.random() - 0.5));

            } catch (error) {
                // console.log("error ", error);
               setError("Error loading question", error);
               
            } finally{
                setLoading(false);
            }
        };

        fetchQuestion();
        
    }, [formData]);


    if (loading) return <p>Loading question...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;


    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedAnswer = document.querySelector('input[name="question"]:checked')?.value;
        
        if (!selectedAnswer) {
            alert("Please select an answer.");
            return;
        }

        setUserAnswer(selectedAnswer);
        setIsCorrect(selectedAnswer === question.correct_answer);
    }


    return (
        <div>
            <form>
                <h2>{he.decode(question.question)}</h2>
                <ul>
                    {answers.map((answer) => (
                        <li key={answer}>
                            <input 
                                type="radio" 
                                name="question" 
                                value={answer} 
                                id={answer}
                            />
                            <label htmlFor={answer}>{he.decode(answer)}</label>
                        </li>
                    ))}
                </ul>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>

            {isCorrect !==null && (
                <div className='answer'>
                    {isCorrect ? (
                        <p>✅ Correct! Great Job!</p>
                    ) : (
                        <p>❌ Incorrect! The correct answer is: <strong>{he.decode(question.correct_answer)}</strong></p>
                    )}
                    <button className='new' onClick={() => window.location.reload()}>New Question</button>
                </div>
            )}

        </div>
    )


    }

export default QuestionForm;