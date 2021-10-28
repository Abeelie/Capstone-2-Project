import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";


const FlashcardTitleCard = (props) => {
    return (
        <div align="center" style={{marginTop: "70px"}}>
            <Card style={{width: "50%"}}>
                <CardContent>
                    <div>
                        <p>Title: {props.title}</p>
                        {/* <p>{props.size}</p> */}
                        <Button variant="contained"
                                fullWidth
                                color="primary"
                                type="submit"
                                onClick={props.showSet}
                                style={{backgroundColor: "#6f00ff"}}
                                >View Set
                        </Button> 
                        <Button variant="contained"
                                fullWidth
                                color="primary"
                                type="submit"
                                onClick={props.deleteSet}
                                style={{backgroundColor: "red", marginTop: "20px"}}
                                >Delete Set
                        </Button> 
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FlashcardTitleCard