import React from "react";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import Link from '@mui/material/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => {
    return (
        <footer>
            <Box style={{backgroundColor:"black", color: "white"}}>
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Quick Links</Box>
                            <Box>
                                <Link href="/" color="inherit" underline="hover">
                                    Home
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/video-chat" color="inherit" underline="hover">
                                    Video Chat
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/chat-room" color="inherit" underline="hover">
                                    Chat Room
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Services</Box>
                            <Box>
                                <Link color="inherit" underline="none">
                                    Voice Recognition
                                </Link>
                            </Box>
                            <Box>
                                <Link color="inherit" underline="none">
                                    Create Flashcards
                                </Link>
                            </Box>
                            <Box>
                                <Link color="inherit" underline="none">
                                    Create Study Agenda's
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{marginBottom: "70px"}}>
                            <Box borderBottom={1}>Social Media</Box>
                            <Box>
                                <Link href="https://www.facebook.com/" color="inherit" underline="hover">
                                    <FacebookIcon /> 
                                </Link>
                            </Box>
                            <Box>
                                <Link href="https://twitter.com/" color="inherit" underline="hover">
                                    <TwitterIcon />
                                </Link>
                            </Box>
                            <Box>
                                <Link href="https://www.instagram.com/" color="inherit" underline="hover">
                                    <InstagramIcon />
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                    <p style={{textAlign: "center", margin: "0", lineHeight: "50px"}}>&copy; 2021 AI-Study.com</p>
                    <p style={{textAlign: "center", margin: "0", lineHeight: "50px"}}>Developed by Abraham Elie</p>
                </Container>
            </Box>
        </footer>
    )
}


export default Footer