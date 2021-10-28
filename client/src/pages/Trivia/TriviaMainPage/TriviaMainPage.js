import { Button, MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./triviamainpage.css"
import { Categories } from "../../../helpers/data/TriviaCategories";
import { useHistory } from "react-router";
import Errors from "../../../components/Errors/Errors";
import backgroundTrivia from "./backgroundTrivia.mp4";
import { Card } from "@material-ui/core";

const TriviaMainPage = (props) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const handleSubmit = () => {
        if(!category || !difficulty || !props.name){
            setError(true);
        }else {
            setError(false);
            props.getQuestions(category, difficulty);
            history.push("/trivia-questions");
        }
    }

    return (
        <>
        <video autoPlay muted loop id="myTrivia-Video">
            <source src={backgroundTrivia} type="video/mp4"/>
        </video>
        <div className="option-box" align="center">
        <Card className="card-form-trivia">
            <h1>Trivia Challenge</h1>
            <div>
                <span>Quiz Options</span>
            </div>
            <div className="trivia-settings">
            {error ? <Errors description={"Please fill out form to start trivia challenge."} /> : null}
                <TextField label="Enter Name" 
                           variant="outlined" 
                           onChange={(e) => props.setName(e.target.value)}
                           value={props.name}/>
                <TextField select
                           label="Select Category"
                           variant="standard"  
                           onChange={(e) => setCategory(e.target.value)}
                           value={category}
                           style={{marginTop: "20px"}}>
                           {Categories.map(cat => (
                                <MenuItem key={cat.category} value={cat.value}>{cat.category}</MenuItem>
                           ))}
                </TextField>
                <TextField select
                           label="Select Difficulty"
                           variant="standard"  
                           onChange={(e) => setDifficulty(e.target.value)}
                           value={difficulty}
                           style={{marginTop: "20px", marginBottom: "20px"}}>
                        <MenuItem key="Easy" value="easy">Easy</MenuItem>
                        <MenuItem key="Medium" value="medium">Medium</MenuItem>
                        <MenuItem key="Hard" value="hard">Hard</MenuItem>
                </TextField>
                <Button variant="contained" 
                        color="primary" 
                        size="large"
                        onClick={handleSubmit}
                        style={{backgroundColor: "#6f00ff", marginBottom: "20px"}}>
                            Start Trivia
                </Button>
            </div>
            <div>
            </div>
            </Card>
        </div>
        </>
    )
}


export default TriviaMainPage