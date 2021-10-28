import axios from "axios";
import { talk } from "../talk/talk";


const Books = async (books) => {
    const key = process.env.REACT_APP_BooksModalKey;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${books}&startIndex=0&maxResults=40&key=${key}`;

    try {
        const response = await axios.get(url);
        const result = response.data.items;
        talk("Great, I found some books for you");
        return result;
    } catch (error) {
        talk(`I am sorry, I was unable to find any search results for ${books}`);
    }
}


export { Books }