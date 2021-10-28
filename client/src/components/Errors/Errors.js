import React from "react";
import { Alert, AlertTitle } from '@material-ui/lab';

const Errors = (props) => {
    return (
        <Alert severity="error">
            <AlertTitle>
              {props.title}
            </AlertTitle>
            <strong>
              {props.description}
            </strong>
        </Alert>
    )
}


export default Errors