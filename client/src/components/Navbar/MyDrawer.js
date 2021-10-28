import React from "react";
import Box from "@material-ui/core/Box";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from '@mui/material/IconButton';
import { useHistory } from "react-router";

const MyDrawer = (props) => {
    const history = useHistory();
    return (
        <div>
            <SwipeableDrawer
                anchor="right"
                open={props.open}
                onClose={props.handleDrawerClose}
                onOpen={props.handleDrawerOpen}>
                <div  
                    onClick={props.handleDrawerClose}
                    onKeyPress={props.handleDrawerClose}
                    role="button"
                    tabIndex={0}
                >
                <IconButton><ChevronRightIcon /></IconButton>
                </div>
                <div>
                    <Box textAlign="center" p={2} style={{width: 200}}>
                        Menu
                    </Box>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => history.push("/")}>
                            <ListItemText primary={"Home"}></ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => history.push("/video-chat")}>
                            <ListItemText primary={"Video Chat"}></ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => history.push("/trivia")}>
                            <ListItemText primary={"Trivia"}></ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => history.push("/contact-us")}>
                            <ListItemText primary={"Contacts"}></ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => history.push("/chat-room")}>
                            <ListItemText primary={"Chat"}></ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => history.push("/login")}>
                            <ListItemText primary={"Login"}></ListItemText>
                        </ListItem>
                        <ListItem button onClick={() => history.push("/sign-up")}>
                            <ListItemText primary={"Signup"}></ListItemText>
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>  
        </div>
    )
}


export default MyDrawer


