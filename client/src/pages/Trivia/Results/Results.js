import { Button } from "@material-ui/core";
import React, {useEffect} from "react";
import { useHistory } from "react-router";

const Results = (props) => {
    const history = useHistory();

    useEffect(() => {
        if(!props.name){
            history.push("/trivia");
        }
    },[props.name, history])


    return (
        <div style={{marginTop: "120px"}} align="center">
            <h2>This is your results {props.name}</h2>
            <h3>Final Score: {props.score} out of 10</h3>
            {props.score > 7 ? <p style={{fontSize: "100px"}}>&#128512;</p> : <p style={{fontSize: "100px"}}>&#128532;</p>}
            <Button variant="contained"
                    color="secondary"
                    size="large"
                    style={{alignSelf: "center"}}
                    href="/trivia"
            >Restart Game</Button>
        </div>
    )
}

export default Results