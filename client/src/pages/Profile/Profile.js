import React, {useState, useContext} from "react";
import { Avatar, Button, Card, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import UserContext from "../../context/UserContext";
import swal from "sweetalert";
import { AIStudyAPI } from "../../helpers/apis/AIStudyAPI";
import "./profile.css";
import { useHistory } from "react-router";

const Profile = (props) => {
    const { user } = useContext(UserContext);
    const history = useHistory();
    const initialFormState = {firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, password: ""}
    const [formData, setFormData] = useState(initialFormState);
    const [isSubmit, setIsSubmit] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleSubmit = async (e) => {
        // if (formData.firstName === "" || formData.lastName === "" || formData.password === "" || formData.email === "") {
        //     swal({title: "Please do not leave anything empty", icon: "error"});
        // }else {
            e.preventDefault();
            const dataToUpdate = {firstName: formData.firstName, lastName: formData.lastName, email: formData.email}
            try {
                setIsSubmit(true)
                await AIStudyAPI.updateProfile(formData.username, dataToUpdate)
            } catch (error) {
                swal({title: error, icon: "error"})
            }
            setIsSubmit(false)
            swal({title: "Update Complete", icon: "success"})
            setFormData(updatedFormDatas => ({ ...updatedFormDatas, password: ""}));
        // }
    }


    const handleDelete = async () => {
        try {
            setDeleting(true)
            await AIStudyAPI.deleteUser(formData.username);
            setTimeout(async () => {
                history.push("/login")
                localStorage.removeItem("ai-study-logged-in-user");
                await swal({title: "Account deleted", icon: "success"});
                window.location.reload();
            }, 1000);
        } catch (error) {
            swal({title: error, icon: "error"});
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
          ...formData,
          [name]: value,
        }));
    };

    return (
        <div align="center" style={{marginTop: "150px"}}>
        <Card className="card-form-profile">
            <Grid>
                <Avatar style={{backgroundColor: "#6f00ff", marginTop: "20px"}}>
                    <InsertEmoticonIcon />
                </Avatar>
                <Typography variant="h3">Profile</Typography>
            </Grid>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid xs={12} item>
                            <TextField label="Username" 
                                       name="username"
                                       value={formData.username}
                                       variant="outlined"
                                       fullWidth
                                       disabled/>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField label="First Name" 
                                       name="firstName"
                                       value={formData.firstName}
                                       onChange={handleChange}
                                       variant="outlined"
                                       fullWidth
                                       required/>
                        </Grid>
                        <Grid xs={12} sm={6} item>
                            <TextField label="Last Name" 
                                       name="lastName"
                                       value={formData.lastName}
                                       onChange={handleChange}
                                       variant="outlined"
                                       fullWidth
                                       required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField label="E-mail" 
                                       type="email"
                                       name="email"
                                       value={formData.email}
                                       onChange={handleChange}
                                       variant="outlined"
                                       fullWidth
                                       required/>
                        </Grid>
                        <Grid xs={12} item>
                            <TextField label="Password" 
                                       type="password"
                                       name="password"
                                       value={formData.password}
                                       onChange={handleChange}
                                       variant="outlined"
                                       fullWidth
                                       disabled/>
                        </Grid>
                        <Grid xs={12} item>
                            <Button variant="contained"
                                    fullWidth
                                    color="primary"
                                    type="submit"
                                    // onClick={handleSubmit}
                                    style={{backgroundColor: "#6f00ff"}}
                                >{isSubmit ? "Updating!........." : "Update Now"}
                            </Button>
                        </Grid>
                        <Grid xs={12} item>
                            <Button variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={handleDelete}
                                    style={{backgroundColor: "red"}}
                                >{deleting ? "Deleting!........." : "Delete Now"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    </div>
    )
}


export default Profile