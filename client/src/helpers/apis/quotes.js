import axios from "axios";
import { talk } from "../talk/talk";

const Quotes = async () => {
        const url = "https://api.quotable.io/random";
    try{
        const response = await axios.get(url);
        const author = response.data.author;
        const result = response.data.content;
        const quote = result + "Written by " + author;
        talk("Okay, I found a motivational quote, Be ready to be inspired");
        talk(quote);
        talk("If you want to hear another one say, motivate me");
        return quote;
    } catch(error){
        talk("I am sorry, I was unable to find a  motivational quote. Please ask me again later");
  }
}



export { Quotes }