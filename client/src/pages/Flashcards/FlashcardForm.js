import React, {useState, useContext} from "react";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@material-ui/core";
import { AIStudyAPI } from "../../helpers/apis/AIStudyAPI";
import UserContext from "../../context/UserContext";
import swal from "sweetalert";

const FlashCardForm = () => {
    const initialFormState = {title: "", question: "", answer: "", tag: ""};
    const [formData, setFormData] = useState(initialFormState);
    const [isSubmit, setIsSubmit] = useState(false);
    const { user } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const FlashcardData = {
            username: user.username, 
            title: formData.title,
            question: formData.question,
            answer: formData.answer,
            tag: formData.tag
        };
        setIsSubmit(true);
        try {
            await AIStudyAPI.createFlashCards(FlashcardData);
            setIsSubmit(false);
            await swal({title: "Flashcard Created", icon: "success"})
            setFormData(initialFormState)
        }catch (error) {
            await swal({title: "title already taken choose another one", icon: "error"})
            window.location.reload()
        }
        // setFormData(updatedFormDatas => ({ ...updatedFormDatas}));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((formData) => ({
          ...formData,
          [name]: value,
        }));
    };

    return(
        <div align="center" style={{marginTop: "120px"}}>
        <Card className="card-form-contact">
          <Typography variant="h2">Create Flashcard</Typography>
          <Typography variant="h6">Please fill out form. &#128512;</Typography>
          <Typography variant="h6">If you are creating a set make sure they all have the same tag name.</Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid xs={12} item>
                        <TextField label="Title" 
                                   value={formData.title}
                                   onChange={handleChange}
                                   name="title"
                                   id="title"
                                   placeholder="Enter Title of set"
                                   variant="outlined"
                                   fullWidth
                                   required/>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Question" 
                                   value={formData.question}
                                   onChange={handleChange}
                                   name="question"
                                   id="question"
                                   multiline 
                                   rows={5}
                                   placeholder="Enter Question"
                                   variant="outlined"
                                   fullWidth
                                   required/>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="Answer" 
                                   value={formData.answer}
                                   onChange={handleChange}
                                   name="answer"
                                   id="answer"
                                   multiline 
                                   rows={5}
                                   placeholder="Enter Answer"
                                   variant="outlined"
                                   fullWidth
                                   required/>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField label="tag" 
                                   value={formData.tag}
                                   onChange={handleChange}
                                   name="tag"
                                   id="tag"
                                   placeholder="Enter Tag"
                                   variant="outlined"
                                   fullWidth
                                   required/>
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
    )
}

export default FlashCardForm