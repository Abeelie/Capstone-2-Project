import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router";
import "./featurescards.css";

const FeatureCards = (props) => {
    const history = useHistory();
    return (
        <Card sx={{ maxWidth: 345 }} className="card-features">
          <CardMedia
            component="img"
            height="180"
            image={props.image}
            alt={props.alt}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button style={{margin: "0 auto", color: "#6f00ff"}} 
                    onClick={() => history.push("/login")} 
                    size="small">
                    Learn More
            </Button>
          </CardActions>
        </Card>
      );
}

export default FeatureCards 