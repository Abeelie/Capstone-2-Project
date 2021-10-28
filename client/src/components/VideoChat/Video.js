import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import Stack from '@mui/material/Stack';
import "./video.css";
import { Card } from "@material-ui/core";
import backgroundVideoChat from "./backgroundVideoChat.mp4";


const Video = (props) => {
    const [callingName, setCallingName] = useState();
    return (
        <>
        <video autoPlay muted loop id={props.stream ? "myVideoChatChange" : "myVideoChat-Video"}>
              <source src={backgroundVideoChat} type="video/mp4"/>
        </video>

		<div className="container">
              <div className="grid-container" style={{marginTop: "80px"}}>
			    <div className="video-container" style={{}}>
				    <div className="user-video" style={{display: props.callAccepted ? "none" : ""}}>
					    {props.stream ? <video playsInline muted ref={props.myVideo} autoPlay style={{ width: "100%", height: "600px", marginLeft: "10px" }} /> : null}
				    </div>
				    <div className="talking-to-person-video" style={{}}>
					    {props.callAccepted && !props.callEnded ? <video className="video-of-other-person" playsInline ref={props.userVideo} autoPlay style={{ width: "100%", height: "600px" }} /> : null}
				    </div>
			    </div>
            <div className="textfield" align="center">
            <Card className="card-form">
            <Stack component="form" sx={{width: "fit-content"}} spacing={2} noValidate autoComplete="off">
              <h1 style={{ textAlign: "center" }}>Study with a Friend</h1>
              <p>Copy the ID and send it your friend to call you.</p>
                <TextField label="Enter Name"
                           id="filled-hidden-label-normal"
                           variant="outlined"
                           name="username"
                           value={props.name}
                           onChange={(e) => props.setName(e.target.value)}
                           placeholder="Enter Your Name"
                />
                <CopyToClipboard text={props.me}>
                    <Button variant="contained" 
                            style={{backgroundColor: "#6f00ff"}} 
                            color="primary" 
                            startIcon={<AssignmentIcon fontSize="large" />}>
                        Copy ID
                    </Button>
                </CopyToClipboard>
                <TextField label="User id to call"
                           id="filled-hidden-label-normal"
                           variant="outlined"
                           name="id"
                           value={props.idToCall}
                           onChange={(e) => props.setIdToCall(e.target.value)}
                           placeholder="User id to call"
                />
                <div className="call-button">
                    {props.callAccepted && !props.callEnded ? (
                        <Button variant="contained" 
                            color="secondary" 
                            style={{backgroundColor: "#6f00ff"}} 
                            onClick={() => {
                                props.leaveCall()
                                setCallingName("")
                                window.location.reload()
                            }}>
                            End Call
                        </Button>
                    ) : (
                        <IconButton color="primary" aria-label="call" onClick={() => {
                             props.callUser(props.idToCall);
                             setCallingName(props.name);
                            }}>
                            <PhoneIcon style={{color: "#6f00ff"}} fontSize="large" /> 
                            {callingName ? <p>You are calling {props.name}</p> : null}
                        </IconButton>
                    )}
                </div>
			<div className="receiving-call">
				{props.receivingCall && !props.callAccepted ? (
					<div className="caller">
						<h1 >{props.name} is calling...</h1>
						    <Button variant="contained" 
                                    style={{backgroundColor: "#6f00ff", marginBottom: "20px"}} 
                                    color="primary" 
                                    onClick={() => {
                                         props.answerCall();
                                         setCallingName("");
                            }}>
							    Answer
						    </Button>
					</div>
				) : null}
			  </div>
            </Stack>
            </Card>
		   </div>
          </div>
		</div>
      </>
    )
}


export default Video