import axios from "axios";
import { talk } from "../talk/talk";

const Joke = async () => {
        const url = "https://api.chucknorris.io/jokes/random?category=career";
    try{
        const response = await axios.get(url);
        const result = response.data.value;
        talk("Okay, I found a joke, check this out");
        talk(result);
        talk("Hahaha!!!!, that was funny. If you want to hear another one say, tell me a joke");
        return result;
    } catch(error){
        talk("I am sorry, I was unable to find a joke. Please ask me again later");
  }
}



export { Joke }