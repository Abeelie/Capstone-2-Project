import { Button } from "@material-ui/core";
import React, {useState} from "react";
import { useHistory } from "react-router";
import Errors from "../../Errors/Errors";
import { talk } from "../../../helpers/talk/talk";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./questionscomponent.css";

const QuestionsComponent = (props) => {

    const commands = [
        {
          command: "The answer is *",
          callback: (answer) => {
            // const selectingAnswer = document.getElementById(answer.toLowerCase())?.click();
            const selectingAnswer = document.getElementById(answer.toLowerCase());
            if(selectingAnswer !== null){ 
                selectingAnswer.click();
            }else{
                return talk("Please repeat your answer choice clearly from the following selections");
            }
            if (answer.toLowerCase() === props.correct.toLowerCase()){
                // handleSelect(answer)
                talk("correct answer");
            }else {
                talk(`incorrect answer. The correct answer is ${props.correct}`);
            }
          },
        },
        {
            command: "Next question",
            callback: () => {
                handleNext();
            },
        },
        {
            command: "Quit",
            callback: () => {
                handleQuit();
                history.push("/trivia");
            },
        },
    ]

    useSpeechRecognition({ commands });
    // const { transcript, resetTranscript } = useSpeechRecognition({ commands });
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const history = useHistory();

    const handleSelect = (o) => {
        if(selected === o && selected === props.correct){
            return "correct-select";
        }else if(selected === o && selected !== props.correct){
            const a = document.getElementById(props.correct.toLowerCase());
            if(a) a.style.backgroundColor = "chartreuse";
            if(a) a.style.color = "black";
            return "wrong-select";
        }else if(o === props.correct){
            return "correct select";
        }
    }

    const handleCheck = (o) => {
        setSelected(o);
        if(o === props.correct) props.setScore(props.score + 1);
        setError(false);
    }

    const handleNext = () => {
        if(props.currentQuestion > 8){
            history.push("/trivia-results");
            SpeechRecognition.stopListening();
            props.setQuestions();
        }else if(selected){
            props.setCurrentQuestion(props.currentQuestion + 1);
            setSelected();
            if(document.getElementsByClassName("mic-icon-container").length === 1) {
                return null;
            }else {
                talk(props.questions[props.currentQuestion + 1]?.question);
            } 
        }else {
            setError("Please make a selection");
        }
    }

    const handleQuit = () => {
        props.setCurrentQuestion(0);
        props.setQuestions();
    };

    return (
        <div className="question-box">
            <h1>Question {props.currentQuestion + 1}/{props.questions.length}</h1>
            <div>
                <p className="question-text">{props.questions[props.currentQuestion]?.question.replace(/[^a-zA-Z ]/g, "").replaceAll("quot", "")}</p>
                <div className="answer-section">
                    {error ? <Errors description={error || "problem getting all answer options from server"} /> : null}
                    {props.answerOptions ? 
                        props.answerOptions.map(o => 
                            <button className={`selectAnswer ${selected ? handleSelect(o) : "b"}`}
                                    onClick={() => handleCheck(o)}
                                    key={o}
                                    id={o.toLowerCase()}
                                    disabled={selected}
                            >{o}</button>
                        ) 
                    : null}
                </div>
                <div className="controls">
                    <Button variant="contained"
                            color="secondary"
                            size="large"
                            // style={{width: "100px"}}
                            href="/trivia"
                            onClick={handleQuit}
                    >Quit
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            size="large"
                            // style={{width: "100px"}}
                            onClick={handleNext}
                    >Next
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default QuestionsComponent
