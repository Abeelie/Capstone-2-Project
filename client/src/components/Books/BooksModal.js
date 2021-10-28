import React from "react";
import { v4 as uuid } from "uuid";
import Modal from "../Modal/Modal";
import onErrorImage from "../../images/onErrorImage.jpg";
import Button from '@material-ui/core/Button';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const BooksModal = (props) => {
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
      <Modal open={props.open} close={props.handleBookClose} style={{}}>
        <Slider {...styles}>
          {props.booksData.map(book => (
              <div key={uuid()}>
                <img src={book?.volumeInfo?.imageLinks?.thumbnail} 
                     className="book-modal-image" 
                     alt="book"
                     onError={(e) => e.target.src = onErrorImage}
                     style={{height: "200px", width: "150px"}}
                />
                <h4 className="book-title">{book.volumeInfo.title}</h4>
                <Button variant="contained" color="primary" 
                        href={book.volumeInfo.previewLink}
                        style={{marginBottom: "100px"}}>
                        Go to Book
                </Button>
              </div>
          ))}
        </Slider>
      </Modal> 
    ) 
  }

  export default BooksModal