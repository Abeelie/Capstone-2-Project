import React from "react";
import "./modal.css";
import ReactDom from "react-dom";
import Button from '@material-ui/core/Button';


const Modal = (props) => {
    return ReactDom.createPortal(
        <>
        <div className="modal-overlay" />
            <div className="modal" style={props.style}>
                {props.children}
                    <div className="btn">
                        <Button variant="contained" 
                                color="secondary"
                                onClick={props.close}>
                                    Close
                        </Button>
                    </div>
            </div>
        </>,
        document.getElementById("modal-section")
    )
}


export default Modal