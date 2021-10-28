import axios from "axios";
import { talk } from "../talk/talk";


const YouTubeAPI = async (searchTerm) => {
    const key = process.env.REACT_APP_YouTubeKey;
    const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=15&q=${searchTerm}`;
    try {
        const response = await axios.get(url);
        talk("Great, I found some videos for you");
        return response.data.items;
    } catch (error) {
        talk("I am sorry, I was unable to find the videos for you. Please try again.")
    }

}



export { YouTubeAPI }