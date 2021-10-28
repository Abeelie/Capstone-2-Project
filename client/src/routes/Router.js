import React, {useState} from "react";
import RebeccaBtn from '../components/RebeccaBtn/RebeccaBtn';
import VideoChat from '../components/VideoChat/VideoChat';
import EnterChat from '../components/Chat/EnterChat';
import { Switch, Route, Redirect } from 'react-router-dom';
import TriviaMainPage from '../pages/Trivia/TriviaMainPage/TriviaMainPage';
import Questions from '../pages/Trivia/Questions/Questions';
import Results from '../pages/Trivia/Results/Results';
import { talk } from '../helpers/talk/talk';
import axios from 'axios';
import NavBar from '../components/Navbar/NavBar';
import Homepage from '../pages/Home/Homepage';
import Footer from '../components/Footer/Footer';
import NotFoundPage from '../pages/404/NotFoundPage';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import MessageSent from '../pages/Contact/MessageSent';
import Dashboard from '../pages/Dashboard/Dashboard';
import Flashcards from '../pages/Flashcards/Flashcards';
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile/Profile";
import CreateFlashcards from "../pages/Flashcards/CreateFlashcards";

const Router = (props) => {

  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  // Trivia Pages
  const getQuestions = async (category, difficulty) => {
     try{
        const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`;
        const res = await axios.get(url);
        setQuestions(res.data.results)
     }catch(error){
        talk("I am sorry. I was unable to get the questions for the trivia. Please try refreshing the page.");
     }
  }


  return (
    <div>
     <NavBar logout={props.logout} />
      <Switch >
        <Route exact path="/">
          <Homepage />
          <RebeccaBtn />
        </Route>
        <Route exact path="/video-chat" >
          <VideoChat />
          <RebeccaBtn />
        </Route>
        <Route exact path="/chat-room" >
          <EnterChat />
          <RebeccaBtn />
        </Route>
        <Route exact path="/trivia" >
          <TriviaMainPage name={name} setName={setName} getQuestions={getQuestions}/>
          <RebeccaBtn /> 
        </Route>
        <Route exact path="/trivia-questions" >
          <Questions name={name} questions={questions} score={score} setScore={setScore} setQuestions={setQuestions}/>
          <RebeccaBtn />
        </Route>
        <Route exact path="/trivia-results">
          <Results name={name} score={score}/>
          <RebeccaBtn />
        </Route>
        <Route exact path="/contact-us">
          <Contact />
          <RebeccaBtn />
        </Route>
        <Route exact path="/message-sent">
          <MessageSent />
          <RebeccaBtn />
        </Route>
        <Route exact path="/login">
          <Login login={props.login} />
          <RebeccaBtn />
        </Route>
        <Route exact path="/sign-up" >
          <Signup signup={props.signup} login={props.login} />
          <RebeccaBtn />
        </Route>
        <ProtectedRoute exact path="/user/dashboard">
          <Dashboard />
          <RebeccaBtn />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/flashcards/:tag">
          <Flashcards />
          <RebeccaBtn />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/create-flashcards">
          <CreateFlashcards />
          <RebeccaBtn />
        </ProtectedRoute>
        <ProtectedRoute exact path="/user/profile">
          <Profile />
          <RebeccaBtn />
        </ProtectedRoute>
        <Route exact path="/404" >
          <NotFoundPage />
          <RebeccaBtn />
        </Route>
        <Route exact path="/log-out">
          <Redirect to="/login" />
        </Route>
        <Redirect to="/404"/>
      </Switch>
      <Footer/>
    </div>
  )
}


export default Router