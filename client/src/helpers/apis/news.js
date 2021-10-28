import axios from "axios";
import { talk } from "../talk/talk";

const News = async (newsItems) => {
    const API_KEY = process.env.REACT_APP_NewsKey;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${newsItems}&api-key=${API_KEY}`;

    try {
        const news = await axios.get(url);
        const result = news.data.response.docs;
        talk("Great, I found some news for you");
        return result;
    } catch (error) {
        talk("I am sorry. I was unable to find any news. Please check back later or rephrase your request thank you.");
    }

}



export { News }