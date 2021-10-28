import axios from "axios";
import { talk } from "../talk/talk";
import { TranslationTalk } from "../talk/translationTalk";

const GoogleTranslate = async (word, toLanguage) => {
    const key = process.env.REACT_APP_GoogleTranslateKey;
    const url = `https://translation.googleapis.com/language/translate/v2?key=${key}&q=${word}&target=${toLanguage}`;

    try{
        const response = await axios.get(url);
        const result = response.data.data.translations[0].translatedText;
        talk(`The translation of ${word} is`);
        TranslationTalk(result, toLanguage);
        return result;
    }catch(error){
        talk("I am sorry, I was unable to translate. Please try again");
        console.error(error);
    }
}



export { GoogleTranslate }

