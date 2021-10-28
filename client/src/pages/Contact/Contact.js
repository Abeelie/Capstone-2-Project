import { Button, Card, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import backgroundContact from "./backgroundContact.mp4";
import "./contact.css";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router"; 
import ReCAPTCHA from "react-google-recaptcha";


const Contact = () => {
    const initialFormState = {firstName: "", lastName: "", email: "", phoneNumber: "", message: ""};
    const [formData, setFormData] = useState(initialFormState);
    const formID = process.env.REACT_APP_ContactsFormKey || process.env.ContactsFormKey;
    const formUrl = `${process.env.REACT_APP_BASEURL}${formID}`;
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState();
    const recaptchaRef = useRef();
    const recaptchaKey = process.env.REACT_APP_RecaptchaKey; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
          ...formData,
          [name]: value,
        }));
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(recaptchaToken === undefined) {
            swal({text: "Please click on the I am not a robot to submit", icon: "error"});
        }else {
            setIsSubmit(true);
            await sendMessage();
        }
    }

    const sendMessage = async () => {
        const data = {
            ...formData,
            "g-recaptcha-response": recaptchaToken
        }
        try {
            await axios.post(formUrl, data)
            history.push("/message-sent");
        } catch(error){
            await swal({title: error, text: "Message not submitted", icon: "error"});
            window.location.reload();
        }
    }

    const handleChangeToken = (token) => {
        setRecaptchaToken(token)
        // console.log(token)
    }

    return (
        <>
        <video autoPlay muted loop id="myContact-Video">
            <source src={backgroundContact} type="video/mp4"/>
        </video>
        <div align="center" style={{marginTop: "120px"}}>
            <Card className="card-form-contact">
              <Typography variant="h2">Contact Us</Typography>
              <Typography variant="h6">Please fill out form and we will get back to you &#128512;</Typography>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={6} item>
                            <TextField label="First Name" 
                                       value={formData.firstName}
                                       onChange={handleChange}
                                       name="firstName"
                                       id="firstName"
                                       placeholder="Enter First Name"
                                       variant="outlined"
                                       fullWidth
                                       required/>

                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField label="Last Name" 
                                       value={formData.lastName}
                                       onChange={handleChange}
                                       name="lastName"
                                       id="lastName"
                                       placeholder="Enter Last Name"
                                       variant="outlined"
                                       fullWidth
                                       required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField label="E-mail" 
                                       value={formData.email}
                                       onChange={handleChange}
                                       name="email"
                                       id="email"
                                       type="email"
                                       placeholder="Enter E-mail"
                                       variant="outlined"
                                       fullWidth
                                       required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField label="Phone Number" 
                                       value={formData.phoneNumber}
                                       onChange={handleChange}
                                       name="phoneNumber"
                                       id="phoneNumber"
                                       type="tel"
                                       placeholder="Enter Phone Number"
                                       variant="outlined"
                                       fullWidth
                                       required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField label="Message" 
                                       value={formData.message}
                                       onChange={handleChange}
                                       name="message"
                                       id="message"
                                       multiline 
                                       rows={5}
                                       placeholder="Enter Message"
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
                                >{isSubmit ? "Submitting right now!........." : "Submit Now!"}
                            </Button>
                        </Grid>
                    </Grid>
                  </form>
                </CardContent>
            </Card>
        </div>
      </>
    )
}

export default Contact