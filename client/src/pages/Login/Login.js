import React, {useState, useRef} from "react";
import { Avatar, Button, Card, CardContent, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import backgroundVideo from "./loginVideo.mp4";
import "./login.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router";
import swal from "sweetalert";

const Login = (props) => {
    const initialFormState = {username: "", password: ""};
    const [formData, setFormData] = useState(initialFormState);
    const recaptchaRef = useRef();
    const recaptchaKey = process.env.REACT_APP_RecaptchaKey; 
    const history = useHistory();
    const [recaptchaToken, setRecaptchaToken] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const [guestIsSubmit, setGuestIsSubmit] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(recaptchaToken === undefined) {
            swal({text: "Please click on the I am not a robot to submit", icon: "error"});
        }else {
            setIsSubmit(true);
            const res = await props.login(formData);
            // setTimeout(async () => {
                if (res.success){
                    history.push("/user/profile")
                }else {
                    await swal({title: "wrong username or password", icon: "error"})
                    window.location.reload();
                }
            // }, 1000);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
          ...formData,
          [name]: value,
        }));
    };
    
    const handleChangeToken = (token) => {
        setRecaptchaToken(token)
    }


    const guestUser = async () => {
        setGuestIsSubmit(true);
        const guest = {username: process.env.REACT_APP_Guest, password: process.env.REACT_APP_GuestPassword}
        const res = await props.login(guest);
        if (res.success){
            history.push("/user/profile")
        }else {
            await swal({title: "wrong username or password", icon: "error"})
            window.location.reload();
        }
    }


    return (
        <>
        <video autoPlay muted loop id="myLogin-Video">
            <source src={backgroundVideo} type="video/mp4"/>
        </video>
        <div align="center" style={{marginTop: "150px"}}>
            <Card className="card-form-login">
                <Grid>
                    <Avatar style={{backgroundColor: "#6f00ff", marginTop: "15px"}}><LockOpenIcon /></Avatar>
                    <Typography variant="h3">Login</Typography>
                </Grid>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid xs={12} item>
                                <TextField label="Username" 
                                           name="username"
                                           onChange={handleChange}
                                           placeholder="Enter Username"
                                           variant="outlined"
                                           fullWidth
                                           required/>
                        
                            </Grid>
                            <Grid xs={12} item>
                                <TextField label="Password" 
                                           type="password"
                                           name="password"
                                           onChange={handleChange}
                                           placeholder="Enter Password"
                                           variant="outlined"
                                           fullWidth
                                           required/>
                    
                            </Grid>
                            <Grid xs={12} item>
                                <FormControlLabel 
                                    style={{float: "left"}}
                                    control={
                                        <Checkbox 
                                                name="checked"
                                                color="primary"
                                        />
                                } 
                                    label="Remember Me"
                                />
                            </Grid>
                            <Grid xs={12} item>
                               {document.readyState === "complete" ? <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaKey} onChange={handleChangeToken}/> : "Loading.............."}
                            </Grid>
                            <Grid xs={12} item>
                                <Button variant="contained"
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                        style={{backgroundColor: "#6f00ff"}}
                                    >{isSubmit ? "Logining now!........." : "Login"}
                                </Button>
                            </Grid>
                            <Grid xs={12} item>
                                <Button variant="contained"
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                        onClick={guestUser}
                                        style={{backgroundColor: "orangered"}}
                                    >{guestIsSubmit ? "Logining now!........." : "Guest"}
                                </Button>
                            </Grid>
                            <Grid xs={12} item>
                                <Typography>
                                    <Link href="sign-up" underline="hover">Don't have an account? Signup Now!</Link> 
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
        </>
    )
}

export default Login