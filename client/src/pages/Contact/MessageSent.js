import React from "react";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useHistory } from "react-router";
import Message from "../../images/message.jpg";

const MessageSent = () => {
    const history = useHistory();
    return (
        <Box>
            <div align="center" style={{marginTop: "40px"}}>
                <img src={Message} 
                     alt="404" 
                     width="30%" 
                     height="30%"
                />
                <h1 style={{fontSize: "50px"}}>Message Sent</h1>
                <h4 style={{fontSize: "30px"}}>
                    We will get back to use as soon as possible.
                </h4>
                <Button variant="contained" 
                        color="primary" 
                        onClick={() => history.push("/")}
                        style={{backgroundColor: "#6f00ff"}}>
                        Go Back to Home!
                </Button>
            </div>
        </Box>
    )
}

export default MessageSent