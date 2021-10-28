import React from "react";
import "./mic.css";
import MicOffIcon from '@material-ui/icons/MicOff';
import MicNoneIcon from '@material-ui/icons/MicNone';


const Mic = (props) => {
    return (
        <div className="mic-wrapper">
          <div className="mic-container">
            {!props.isListening && (
            <div className="mic-icon-container" 
                 onClick={props.startListening}>
                 <MicOffIcon style={{fontSize: "50px", color: "#ff1744"}} />
            </div>
             )}
            {props.isListening && (
            <div className="mic-icon-container-off" 
                 onClick={props.stopListening}>
                <MicNoneIcon style={{fontSize: "50px", color: "#00e676"}} />
            </div>
             )}
            </div>
        </div>
    )
}



export default Mic