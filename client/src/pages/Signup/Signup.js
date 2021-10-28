import React, {useState, useRef} from "react";
import { Avatar, Button, Card, CardContent, Grid, Link, TextField, Typography } from "@material-ui/core";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import backgroundVideoSignUP from "./background-signup.mp4";
import "./signup.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router";
import swal from "sweetalert";

const Signup = (props) => {
    const initialFormState = {firstName: "", lastName: "", username: "", email: "", password: ""};
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
            const res = await props.signup(formData);
            // setTimeout(async () => {
                if(res.success){
                    history.push("/user/profile");
                }else {
                    await swal({title: "Signup Error", description: "Username already taken", icon: "error"})
                    window.location.reload();
                }
            // }, 1000)
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
        <video autoPlay muted loop id="mySignup-Video">
            <source src={backgroundVideoSignUP} type="video/mp4"/>
        </video>
        <div align="center" style={{marginTop: "150px"}}>
        <Card className="card-form-signup">
            <Grid>
                <Avatar style={{backgroundColor: "#6f00ff", marginTop: "20px"}}><AssignmentIndIcon /></Avatar>
                <Typography variant="h3">Sign-up</Typography>
            </Grid>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={6} item>
                            <TextField label="First Name" 
                                    placeholder="Enter First Name"
                                    name="firstName"
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required/>
                
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField label="Last Name" 
                                    name="lastName"
                                    onChange={handleChange}
                                    placeholder="Enter Last Name"
                                    variant="outlined"
                                    fullWidth
                                    required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField label="Username" 
                                       name="username"
                                       onChange={handleChange}
                                       placeholder="Enter username"
                                       variant="outlined"
                                       fullWidth
                                       required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField label="E-mail" 
                                       type="email"
                                       name="email"
                                       onChange={handleChange}
                                       placeholder="Enter E-mail"
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
                             {document.readyState === "complete" ? <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaKey} onChange={handleChangeToken}/> : "Loading.............."}
                        </Grid>
                        <Grid xs={12} item>
                            <Button variant="contained"
                                    fullWidth
                                    color="primary"
                                    type="submit"
                                    style={{backgroundColor: "#6f00ff"}}
                                >{isSubmit ? "Signing up!........." : "Sign up"}
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
                                <Link href="login" underline="hover">Already have an account? Login Now! &#128512;</Link> 
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

export default Signup