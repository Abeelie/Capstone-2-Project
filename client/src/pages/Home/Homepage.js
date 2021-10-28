import React from "react";
import Box from '@mui/material/Box';
import "./homepage.css";
import backgroundVideo from "./video/background-video.mp4";
import { Button, Grid } from "@mui/material";
import { useHistory } from "react-router";
import FeatureCards from "./FeatureCards/FeatureCards";
import VideoChatImage from "../../images/videoChat.png";
import VoiceImage from "../../images/voiceImage.jpg";
import ClassroomImage from "../../images/chatroomImage.jpg";
import FlashCardsImage from "../../images/flashcardsImage.png";
import TodoListImage from "../../images/todoList.jpg";
import ProgressTrackerImage from "../../images/progressTracker.jpg";


const Homepage = () => {
    const history = useHistory();
    return (
        <>
        <Box className="hero-section">
            <video autoPlay muted loop id="myVideo">
                <source src={backgroundVideo} type="video/mp4"/>
            </video>
            <Box>
                <div className="text-welcome">
                    <p className="title">Welcome to AI Study</p>
                    <h6 className="subtitle">A Voice Powered Study Assistant</h6>
                </div>
            </Box>
        </Box>

        <div className="about-section" style={{marginTop: "550px"}}>
            <Box>
                <div className="about" style={{marginLeft: "30px", marginRight: "30px"}}>
                    <h1 style={{fontSize: "40px", textAlign: "center", marginBottom: "50px"}} >About Us</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} >
                            <img src="https://i.imgur.com/KrlmDp0.jpg" 
                                 alt="loop"
                                 width="100%"
                                 height="100%"
                                 className="about-img"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <p style={{fontSize: "30px", marginTop: "0"}}>
                                AI-Study is a platform dedicated to providing students with the tools they 
                                need to have efficient study sessions. This is accomplished by integrating
                                speech recognition and speech utterance technology that listens for the user
                                input as well as talks to the user to perform tasks. Examples of tasks are 
                                performing book searches, news searches, youtube searches, translation of 
                                words, perform simple math problems, definition of words, temperature of cities,
                                and provide motivational quotes while studying. To try it, turn on the mic and say 
                                commands to get started. 
                            </p>
                            <div align="center">
                                <Button variant="outlined"
                                        size="large" 
                                        onClick={() => history.push("/login")}
                                        style={{color: "#6f00ff", borderColor: "#6f00ff"}}
                                >Try it out!
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </div>

        <div className="features-section" style={{marginTop: "150px"}}>
            <Box>
                <div className="features" style={{}}>
                    <h1 style={{fontSize: "40px", textAlign: "center", marginBottom: "50px"}} >Features</h1>
                    <div align="center">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} >
                            <FeatureCards 
                                image={VideoChatImage}
                                alt={"video-chat"}
                                title={"Video Chat"}
                                description={"You don't have to study alone. Study with a friend through video chat."}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FeatureCards 
                                image={VoiceImage}
                                alt={"Voice Powered Commands"}
                                title={"Voice Powered Commands"}
                                description={"Ask the assistant anything such as search for news and youtube videos."}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FeatureCards 
                                image={FlashCardsImage}
                                alt={"create-flashcards"}
                                title={"Create Flashcards"}
                                description={"Create flashcards and use voice commands to control flashcard quizzes."}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={4} style={{marginTop: "30px"}}>
                            <FeatureCards 
                                image={ClassroomImage}
                                alt={"chatroom"}
                                title={"Chatroom"}
                                description={"Join a chatroom or create a chatroom to get the answers you need."}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} style={{marginTop: "30px"}}>
                            <FeatureCards 
                                image={TodoListImage}
                                alt={"to-do-list"}
                                title={"Set Study Agenda"}
                                description={"Create todo lists to keep track of what study agendas you want to accomplish."}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} style={{marginTop: "30px"}}>
                            <FeatureCards 
                                image={ProgressTrackerImage}
                                alt={"l"}
                                title={"Progress Tracker"}
                                description={"A chart is provided to monitor how long you spend studying online."}
                            />
                        </Grid>
                      </Grid>
                    </div>
                </div>
            </Box>
        </div>
        </>
    )
}

export default Homepage

