import React from "react";
import "./weathermodal.css"
import Modal from "../Modal/Modal";
import onErrorImage from "../../images/onErrorImage.jpg";

//note to self The data is in the weather command in rebeccaBTN

const WeatherModal = (props) => {
    return ( 
        <Modal open={props.handleOpen} close={props.handleWeatherClose}>
            <div>
                <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} 
                     className="icon-weather" 
                     alt="icon"
                     onError={(e) => e.target.src = onErrorImage}
                />
                <h1 className="weather-name">{props.name}</h1>
                <h3 className="weather-temp">{Math.floor(props.temp)} degrees</h3>
                <h4 className="weather-description">{props.description}</h4>
            </div>
        </Modal> 
    ) 
  }

  export default WeatherModal