import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button';
import Errors from "../Errors/Errors";
import { Card } from "@material-ui/core";
import backgroundChat from "./backgroundChat.mp4";
 
const socket = io.connect(process.env.REACT_APP_BASE_URL);

const EnterChat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [error, setError] = useState(false);
  // const [socketError, setSocketError] = useState(false);

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit("join_room", room);
      setShowChat(true);
    }else {
      setError(true)
      setTimeout(() => setError(false), 3000);
    }
  }

  // socket.on("connect_error", (err) => {
	// 	setSocketError(true);
	// 	// console.log(err.message); 
	// });

  return (
    <div align="center">
      {error ? <Errors title={"Invalid submit"} description={"Form can not be empty."}/> : null}
        {!showChat ? (
          <>
          <video autoPlay muted loop id="myChat-Video">
              <source src={backgroundChat} type="video/mp4"/>
          </video>
          <div style={{marginTop: "120px"}} className="enter-chat">
            <Card style={{maxWidth: "550px"}}>
            <h3 style={{fontSize: "40px"}}>Chat with a Friend</h3>
            <p>Enter any room name and share the room name with</p>
            <p>your friend to start chatting.</p>
            <Stack component="form" sx={{width: "fit-content"}} spacing={2} noValidate autoComplete="off">
              <TextField label="Enter Name"
                         variant="outlined"
                         id="filled-hidden-label-normal"
                         name="username"
                         value={username}
                         placeholder="Enter Name"
                         onChange={(e) => setUsername(e.target.value)}
              />
              <TextField label="Room Name"
                         id="filled-hidden-label-normal"
                         variant="outlined"
                         name="room"
                         value={room}
                         placeholder="Room Name"
                         onChange={(e) => setRoom(e.target.value)}
              />
            </Stack>
              <Button style={{marginTop: "22px", backgroundColor: "#6f00ff", marginBottom: "50px"}} variant="contained" color="primary" onClick={joinRoom}>Join A Room</Button>
            </Card>
          </div>
          </>
          ) : (
             <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    )
}

export default EnterChat