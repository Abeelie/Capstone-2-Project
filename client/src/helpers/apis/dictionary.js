import axios from "axios";
import { talk } from "../talk/talk";

const Dictionary = async (word) => {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try{
        const response = await axios.get(url);
        const definition = response.data[0].meanings[0].definitions[0].definition;
        const dictionary = `The meaning of ${word} is ${definition}.`
        talk(dictionary);
        return dictionary;
    } catch(error){
        talk(`I am sorry, I was unable to find the meaning of ${word}. 
              Please ask me again later`);
  }
}



export { Dictionary }