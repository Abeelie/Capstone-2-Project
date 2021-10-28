import React from "react";
import Modal from "../Modal/Modal";
import { v4 as uuid } from "uuid";
import { CommandsToShow } from "./CommandsToShow";
import "./commands.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Commands = (props) => {
    const styles = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }

    return (
        <Modal open={props.open} close={props.handleCommandsClose} style={{}}>
            <div className="commands-container">
                <h2 style={{textAlign: "center"}}>Commands</h2>
                    <Slider {...styles}>
                        {Object.values(CommandsToShow).map(item => ( 
                            <div align="center" 
                                 key={uuid()}>
                                <p style={{marginBottom: "100px"}}>{item}</p>
                            </div>
                        ))} 
                    </Slider>
            </div>
        </Modal>
    )
}


export default Commands