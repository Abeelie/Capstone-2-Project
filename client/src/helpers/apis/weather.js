import axios from "axios";
import { talk } from "../talk/talk";

const Weather = async (location) => {
        const url = "https://api.openweathermap.org/data/2.5/weather";
        const apiKey = process.env.REACT_APP_WeatherKey;
        const request_url = `${url}?appid=${apiKey}&q=${location}&units=imperial`;
    try{
        const response = await axios.get(request_url);
        const result = response.data.main.temp;
        const temp = `The temperature in ${location} is ${Math.floor(result)} degrees in Fahrenheit`;
        talk(temp); 
        return response.data;
    } catch(error){
        talk(`I am sorry, I could not find the temperature for ${location}`);
        talk("I can only tell you, the temperature of cities");
  }
}



export { Weather }