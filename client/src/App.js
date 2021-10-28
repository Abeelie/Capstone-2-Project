import React, {useState, useEffect } from 'react';
import './App.css';
import Router from './routes/Router';
import {BrowserRouter} from "react-router-dom";
import UserContext from './context/UserContext';
import {useLocalStorage} from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import {AIStudyAPI} from "./helpers/apis/AIStudyAPI";
import swal from 'sweetalert';
import { CircularProgress } from "@material-ui/core";
import Errors from './components/Errors/Errors';
import io from "socket.io-client";
// import { useHistory } from "react-router";

export const LocalStorageTokenKey = "ai-study-logged-in-user";
const socket = io.connect(process.env.REACT_APP_ServerURL);

const App = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(false);
  const [token, setToken] = useLocalStorage(LocalStorageTokenKey);
  const [socketError, setSocketError] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        try {
          const { username } = jwt.decode(token);
          AIStudyAPI.token = token;
          const userData = await AIStudyAPI.getUser(username);
          setUser(userData);
        } catch (error) {
          swal({title: error, icon: "error"})
          setUser(null);
        }
      }
      setUserInfo(true)
    }
    setUserInfo(false)
    getUser();
  }, [token]);


  const login = async (data) => {
    try {
      const res = await AIStudyAPI.login(data);
      setToken(res);
      return { success: true };
    } catch (error) {
      // swal({title: error, icon: "error"})
      // console.error(error);
      return { success: false, error };
    }
  }

  const logout = () => {
    setUser(null);
    setToken(null);
  }

  const signup = async (data) => {
    try {
      const res = await AIStudyAPI.signup(data);
      setToken(res);
      return { success: true };
    } catch (error) {
      // swal({title: error, icon: "error"})
      // console.error(error);
      return { success: false, error };
    }
  }

  if(!userInfo){
    return (
      <div align="center">
        <CircularProgress 
          style={{marginTop: "260px"}} 
          color="inherit" 
          size={150} 
          thickness={1}
        />
      </div>
    )
  } 

  socket.on("connect_error", (err) => {
		setSocketError(true);
		// console.log(err.message); 
	});

  return (
      <BrowserRouter>
        <UserContext.Provider value={{user, setUser}}>
          <div className="App">
          {socketError ? <Errors title="Sorry, your machine websocket connection is not enabled"/> : null}
            <Router 
              login={login} 
              signup={signup} 
              logout={logout} 
            />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
