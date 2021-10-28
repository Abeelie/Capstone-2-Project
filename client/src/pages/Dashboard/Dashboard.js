import React, {useState, useContext, useEffect} from "react"
import Box from '@mui/material/Box';
import "./dashboard.css";
import Video from "./video.mp4"
import { Line } from 'react-chartjs-2';
import { data, options } from "./LineChartData";
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import UserContext from "../../context/UserContext";
import FlashcardTitleCard from "../Flashcards/FlashcardTitleCard";
import { AIStudyAPI } from "../../helpers/apis/AIStudyAPI";
import swal from "sweetalert";
import { useHistory } from "react-router";
import { v4 as uuid } from "uuid";
import { Grid } from "@material-ui/core";

const Dashboard = () => {
    const date = new Date();
    const getDate = date.toLocaleString();
    const formatDate = getDate.substring(0,10);
    const unixTime = date.getTime();
    const formatTime = new Date(unixTime).toLocaleTimeString();
    const [value, setValue] = useState('1');
    const { user } = useContext(UserContext);
    const [flashcardData, setFlashcardData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getFlashcardData = async () => {
            try {
              const userData = await AIStudyAPI.getUserFlashCards(user.username);
              setFlashcardData(userData);
            } catch (error) {
              swal({title: error, icon: "error"})
              setFlashcardData([]);
            }
        }
        getFlashcardData();
      },[]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const showSet = (tag) => {
        history.push(`/user/flashcards/${tag}`);
    }

    const deleteSet = async (tag) => {
        try {
            await AIStudyAPI.deleteFlashCards(tag)
            await swal({title: "Set deleted", icon: "success"})
            window.location.reload()
        }catch(error){
            swal({title: error, icon: "error"})
        }
    }


    return (
        <>
        <Box className="dashboard-section">
            <video autoPlay muted loop id="myDashboardVideo">
                <source src={Video} type="video/mp4"/>
            </video>
            <Box>
                <div className="text-dashboard-welcome">
                    <p className="dashboard-title">Welcome {user.username}</p>
                    <h6 className="dashboard-subtitle">{formatDate}</h6>
                    <h6 className="dashboard-subtitle">{formatTime}</h6>
                </div>
            </Box>
        </Box>

        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} centered>
                    <Tab label="Quiz sets" value="1" />
                    <Tab label="Progress Chart" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">
                  <Grid container spacing={1}>
                    {flashcardData.map(d =>
                     <>
                      <Grid xs={12} sm={6} md={4} item key={uuid()} >
                        <FlashcardTitleCard 
                            title={d.title} 
                            showSet={() => showSet(d.tag)}
                            deleteSet={() => deleteSet(d.tag)}
                        />
                      </Grid>
                     </>
                    )}
                  </Grid>
                </TabPanel>
                <TabPanel value="2">
                    <div className="graph" style={{width: "80%", margin: "0 auto"}}>
                        <Line data={data} options={options}/>
                    </div>
                </TabPanel>
            </TabContext>
        </Box>
        </>
    )
}

export default Dashboard