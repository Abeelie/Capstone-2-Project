import React from 'react';
import Modal from "../Modal/Modal";
import { v4 as uuid } from "uuid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import onErrorImage from "../../images/onErrorImage.jpg";
import Button from '@material-ui/core/Button';

const NewsModal = (props) => {
    return (
        <Modal open={props.open} close={props.handleNewsClose}>
            <Slider>
                {props.news.map(item => (
                    <div key={uuid()}>
                        <img src={`https://www.nytimes.com/${item?.multimedia[0]?.url}`} 
                             alt="news"
                             onError={(e) => e.target.src = onErrorImage}
                             width="100%" 
                             height="350"
                            //  height="450"
                            //  style={{height: "70%", width: "70%", margin: "0 auto"}}
                        />
                        <h2 style={{textAlign: "center"}}>
                            Headline: {item?.headline?.main}
                        </h2>
                        <h4 style={{textAlign: "center"}}>
                            {item?.byline?.original}
                        </h4>
                        <center>
                        <Button variant="contained" color="primary" href={item?.web_url}>
                            Go to Story
                        </Button>
                        </center>
                    </div>
                ))}
            </Slider>
        </Modal>
    )
}



export default NewsModal


