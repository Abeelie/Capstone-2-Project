import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";
import Button from '@material-ui/core/Button';
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router";

const Chat = (props) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const history = useHistory();
  
    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData = {
          room: props.room,
          username: props.username,
          message: currentMessage,
          time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        }
  
        await props.socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    };
  
    useEffect(() => {
      props.socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
      });
    }, [props.socket]);
  
    return (
      <div className="chat-window">
        <div className="header">
          <p>Live Chat in {props.room} room</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map(messageContent => (
                <div className="message" key={uuid()} id={props.username === messageContent.username ? "yourUsername" : "otherPeople"}>
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="users">{messageContent.username}</p>
                    </div>
                  </div>
                </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Write Message"
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={e => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} variant="contained" color="primary">Send</Button>
          <Button onClick={() => history.push("/")} variant="contained" color="secondary">Exit</Button>
        </div>
      </div>
    );
  }
  



export default Chat