import React from "react";
import Modal from "../Modal/Modal";


const Translation = (props) => {
    return (
        <Modal open={props.open} close={props.handleTranslateClose} style={{}}>
                <h1 style={{textAlign: "center"}}>
                    {props.word} {"--->"} {props.translatedWord}
                </h1>
        </Modal>
    )
}


export default Translation