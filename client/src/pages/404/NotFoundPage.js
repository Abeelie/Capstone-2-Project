import React from "react";
import Box from '@mui/material/Box';
import NotFoundPageImage from "../../images/404.png";
import { Button } from "@mui/material";
import { useHistory } from "react-router"; 

const NotFoundPage = () => {
    const history = useHistory();
    return (
        <Box>
            <div align="center" style={{marginTop: "40px"}}>
                <img src={NotFoundPageImage} 
                     alt="404" 
                     width="30%" 
                     height="30%"
                />
                <h1 style={{fontSize: "50px"}}>404</h1>
                <h4 style={{fontSize: "30px"}}>
                    The page requested does not exist
                </h4>
                <Button variant="contained" 
                        color="primary" 
                        onClick={() => history.push("/")}
                        style={{backgroundColor: "#6f00ff"}}>
                        Go Back!
                </Button>
            </div>
        </Box>
    )
}

export default NotFoundPage