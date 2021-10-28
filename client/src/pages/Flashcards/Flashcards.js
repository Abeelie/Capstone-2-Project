import React, {useEffect, useState, useContext} from 'react';
import { FlashcardComponent } from 'react-flashcard';
import { useParams} from 'react-router-dom';
import { AIStudyAPI } from '../../helpers/apis/AIStudyAPI';
import swal from 'sweetalert';
import { useHistory } from "react-router";
import UserContext from "../../context/UserContext";

const Flashcards = () => {
    const {tag} = useParams();
    const [flashcardsData, setFlashcardsData] = useState([]);
    // const [newFlashCardData, setNewFlashCardData] = useState([]);
    const history = useHistory();
    const { user } = useContext(UserContext);
    // const [cards, setCards] = useState();
    // if (!title) return <Redirect to="/user/dashboard"/>

    useEffect(() => {
        const getFlashcards = async () => {
            try {
              const flashcards = await AIStudyAPI.getFlashCards(tag);
              setFlashcardsData(flashcards)
            } catch (error) {
              swal({title: error, icon: "error"})
            }
        }
        getFlashcards();
      },[]);

    const filteredData = flashcardsData.filter(d => d.username !== user.username);
    const data = filteredData.map(d => 
      [{front: {text: d.question}, back: {text: d.answer}}]
    )

    return (
        <div style={{width: "70%", margin: "0 auto", paddingTop: "100px"}}>
            <FlashcardComponent   
                dataSource={data.flat()} 
                onFinish={() => history.push("/user/dashboard")}
            />
        </div>
    )
}



export default Flashcards