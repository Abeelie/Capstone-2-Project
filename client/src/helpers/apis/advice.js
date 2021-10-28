import axios from "axios";
import { talk } from "../talk/talk";

const Advice = async () => {
        const url = "https://api.adviceslip.com/advice";
    try{
        const response = await axios.get(url);
        const result = response.data.slip.advice;
        talk("Okay, I found one, Be ready to be inspired");
        talk(result);
        talk("If you want to hear another one say, give me some advice");
        return result;
    } catch(error){
        talk("I am sorry, I was unable to find some advice for you. Please ask me again later");
  }
}



export { Advice }