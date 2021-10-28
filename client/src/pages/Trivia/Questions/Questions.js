import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import QuestionsComponent from "../../../components/Trivia/Questions/Questions";

const Questions = (props) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerOptions, setAnswerOptions] = useState();

    useEffect(() => {
        setAnswerOptions(
            props.questions ? 
                handleShuffle([
                    props.questions[currentQuestion]?.correct_answer,
                    ...props.questions[currentQuestion]?.incorrect_answers
            ]) : null);
            // console.log(props.questions[currentQuestion]?.incorrect_answers)

    },[props.questions, currentQuestion])

    const handleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5)
    }

    return (
        <div className="questions" align="center" style={{marginTop: "100px"}}>
            <h1>Welcome, {props.name}</h1>
            <p>Voice commands are "the answer is (answer option)", "next question" and "quit"</p>
            <p>Make sure the mic is open (green indicates on)</p>
            {props.questions ? (
              <>
                <div>
                    <h3>Category: {props.questions[currentQuestion].category}</h3>
                    <h3>Score: {props.score}</h3>
                </div>

                <QuestionsComponent 
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    questions={props.questions} 
                    answerOptions={answerOptions}
                    score={props.score}
                    setScore={props.setScore}
                    setQuestions={props.setQuestions}  
                    correct={props.questions[currentQuestion]?.correct_answer} 
                />
              </>

            ) : ( 
                <CircularProgress 
                    style={{marginTop: "150px"}} 
                    color="inherit" 
                    size={150} 
                    thickness={1}/>
            )}
        </div>
    )
}

export default Questions