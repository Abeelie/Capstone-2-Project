import React from "react";
import smile from "../../images/smile.png";
import Modal from "../Modal/Modal";
import "./custommodal.css"

//note to self This opens API Data from Dictionary, Joke, Quotes, and Advice

const CustomModal = (props) => {
    return ( 
        <Modal open={props.handleOpen} close={props.handleClose}>
            <div className="Outer">
                <div className="smile-container">
                    <img src={smile} className="smile" alt="smile"></img>
                </div>
                <p className="modal-data">{props.data}</p>
            </div>
        </Modal> 
    )
}


export default CustomModal