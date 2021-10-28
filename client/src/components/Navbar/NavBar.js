import React, { useState, useContext } from "react";
import "./navbar.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import MyDrawer from "./MyDrawer";
import UserContext from "../../context/UserContext";
import MyLoggedInDrawer from "./MyLoggedInDrawer";

const NavBar = (props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const matchMedia = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useContext(UserContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const loggedInUserNavBar = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{color: "white"}}>
        <Toolbar className="toolbar-nav" variant="root">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI-Study
          </Typography>
          {matchMedia ? ( 
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleDrawerOpen}>
                <MenuIcon /> 
              </IconButton>
          ) : (
          <>
          <NavLink className="btn-btn-navbar" to="/" style={{ textDecoration: 'none', color: "white" }}>HOME</NavLink>
          <NavLink className="btn-btn-navbar" to="/video-chat" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>VIDEO CHAT</NavLink>
          <NavLink className="btn-btn-navbar" to="/trivia" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>TRIVIA</NavLink>
          <NavLink className="btn-btn-navbar" to="/chat-room" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>CHAT</NavLink>
          <NavLink className="btn-btn-navbar" to="/contact-us" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>CONTACT US</NavLink>
          <NavLink className="btn-btn-navbar" to="/user/dashboard" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>DASHBOARD</NavLink>
          <NavLink className="btn-btn-navbar" to="/user/profile" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>PROFILE</NavLink>
          <NavLink className="btn-btn-navbar" to="/user/create-flashcards" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>CREATE FLASHCARDS</NavLink>
          <NavLink className="btn-btn-navbar" to="/log-out" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}} onClick={props.logout}>LOG OUT</NavLink>    
          </>
          )}
          </Toolbar>
          {open ? <MyLoggedInDrawer 
                      open={open} 
                      handleDrawerOpen={handleDrawerOpen}
                      handleDrawerClose={handleDrawerClose}
                      logout={props.logout}
                  /> 
          : null}
      </AppBar>
    </Box>
    )
  }

  const loggedOutUserNavBar = () => {
    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{color: "white"}}>
        <Toolbar className="toolbar-nav" variant="root">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI-Study
          </Typography>
          {matchMedia ? ( 
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleDrawerOpen}>
                <MenuIcon /> 
              </IconButton>
          ) : (
          <>
          <NavLink className="btn-btn-navbar" to="/" style={{ textDecoration: 'none', color: "white" }}>HOME</NavLink>
          <NavLink className="btn-btn-navbar" to="/video-chat" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>VIDEO CHAT</NavLink>
          <NavLink className="btn-btn-navbar" to="/trivia" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>TRIVIA</NavLink>
          <NavLink className="btn-btn-navbar" to="/chat-room" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>CHAT</NavLink>
          <NavLink className="btn-btn-navbar" to="/contact-us" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>CONTACT US</NavLink>
          <NavLink className="btn-btn-navbar" to="/login" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>LOGIN</NavLink>
          <NavLink className="btn-btn-navbar" to="/sign-up" style={{ textDecoration: 'none', color: "white" }} activeStyle={{borderBottom: "5px dotted"}}>SIGNUP</NavLink>    
          </>
          )}
          </Toolbar>
          {open ? <MyDrawer 
                      open={open} 
                      handleDrawerOpen={handleDrawerOpen}
                      handleDrawerClose={handleDrawerClose}
                  /> 
          : null}
      </AppBar>
    </Box>
    )
  }
  return <div>{user ? loggedInUserNavBar() : loggedOutUserNavBar()}</div>;
}


export default NavBar