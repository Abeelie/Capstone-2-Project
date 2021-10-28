import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuid } from "uuid";
import Modal from "../Modal/Modal";
import "./youtube.css";



const YouTubeModal = (props) => {
    return (
        <Modal open={props.open} close={props.handleBookClose} style={{}}>
            <Slider>
                {props.youtubeData?.map(video => (
                    <div key={uuid()} className="youtube-video">
                        <iframe id="player" 
                                title="YouTube Video"
                                type="text/html" 
                                width="100%" 
                                height="450"
                                src={`https://www.youtube.com/embed/${video.id.videoId}?enablejsapi=1&origin=https://ai-study.netlify.app`}
                                frameBorder="0">
                        </iframe>
                    </div>
                ))}
            </Slider>
        </Modal>
    )
}


export default YouTubeModal