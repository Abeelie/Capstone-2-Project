import React, { useState, useContext } from "react";
import "./rebeccaBtn.css";
import Mic from "../Mic/Mic";
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { talk } from "../../helpers/talk/talk";
import { Weather } from "../../helpers/apis/weather";
import { Joke } from "../../helpers/apis/joke";
import { Dictionary } from "../../helpers/apis/dictionary";
import { Quotes } from "../../helpers/apis/quotes";
import { Advice } from "../../helpers/apis/advice";
import { Math } from "../../helpers/math/math";
import { Books } from "../../helpers/apis/books";
import { News } from "../../helpers/apis/news";
import { YouTubeAPI } from "../../helpers/apis/youtubeapi";
import { GoogleTranslate } from "../../helpers/apis/googletranslate";
import { languageList } from "../Translate/language-dictionairy";
import NewsModal from "../NewsModal/NewsModal";
import BooksModal from "../Books/BooksModal";
import CustomModal from "../CustomModal/CustomModal";
import WeatherModal from "../WeatherModal/WeatherModal";
import YouTubeModal from "../YouTube/YouTubeModal";
import Translation from "../Translate/Translation";
import ToDo from "../ToDo/Todo";
import Commands from "../Commands/Commands";
import { useHistory } from "react-router";
import { AIStudyAPI } from "../../helpers/apis/AIStudyAPI";
import UserContext from "../../context/UserContext";
// import { v4 as uuid } from "uuid";


const RebeccaBtn = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [booksData, setBooksData] = useState(false);
    const [newsData, setNewsData] = useState();
    const [weatherData, setWeatherData] = useState();
    const [youtubeData, setYouTubeData] = useState();
    const [languageWord, setLanguageWord] = useState();
    const [translatedWord, setTranslatedWord] = useState();
    const [toDoList, setToDoList] = useState([]);
    const [toDoListItem, setToDoListItem] = useState();
    const [commandsList, setCommandList] = useState();
    const { user } = useContext(UserContext);
    const history = useHistory();

    // Weather data 
    const [icon, setIcon] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [temp, setTemp] = useState();
    

    const commands = [
        {
          command: "Hello",
          callback: () => {
            talk(`Welcome, this is a study website that is driven by voice commands. 
                 Please refer to the command list to get started. You can access commands by saying commands`);
          },
        },
        {
          command: "open *",
          callback: (website) => {
            talk("Okay, sure thing!");
            window.open("http://" + website.split(" ").join(""));
          },
        },
        {
          command: "today's date",
          callback: () => {
            const date = new Date();
            const getDate = date.toLocaleString();
            const formatDate = getDate.substring(0,10)
            talk(formatDate);
          },
        },
        {
          command: "time",
          callback: () => {
            const date = new Date();
            const unixTime = date.getTime();
            const formatTime = new Date(unixTime).toLocaleTimeString()
            talk(formatTime);
          },
        },
        {
          command: "google search *",
          callback: (term) => {
            const query = term;
            talk("Okay, sure thing!");
            window.open('http://google.com/search?q=' + query);
          },
        },
        {
          command: "solution to *",
          callback: (doMath) => {
            talk(`I am searching right now for the solution`);
            const res = Math(doMath);
            handleOpen(res);
          },
        },
        {
          command: "what is the temperature in *",
          callback: (location) => {
            const loc = location.split(" ").join("");
            talk(`I am searching right now for the temperature in ${loc}!!!`);
            const res = Weather(loc);
            res.then(d => { 
              setIcon(d?.weather[0]?.icon)
              setName(d?.name);
              setDescription(d?.weather[0]?.description);
              setTemp(d?.main?.temp)
              return setWeatherData(d);
            });
          },
        },
        {
          command: "what is the meaning of *",
          callback: (word) => {
            const searchWord = word.split(" ").join("");
            talk(`I am searching right now, for the meaning of ${searchWord}!!!`);
            const res = Dictionary(searchWord);
            res.then(d => { return handleOpen(d);});
          },
        },
        {
          command: "tell me a joke",
          callback: () => {
            talk("Sure, give me a second to find one")
            const res = Joke();
            res.then(d => { return handleOpen(d);});
          },
        },
        {
          command: "motivate me",
          callback: () => {
            talk("Sure, give me a second to find a motivational quote")
            const res = Quotes();
            res.then(d => { return handleOpen(d);});
          },
        },
        {
          command: "give me some advice",
          callback: () => {
            talk("Sure, give me a second to find some advice to help you")
            const res = Advice();
            res.then(d => { return handleOpen(d);});
          },
        },
        {
          command: "Book search for *",
          callback: (books) => {
            talk(`Sure, give me a second to find the book to help you. 
                  Also, if you are looking for a particular book, be specific 
                  about the title.`);
            const res = Books(books);
            res.then(d => { return setBooksData(d);});
          },
        },
        {
          command: "News search for *",
          callback: (newsItems) => {
            talk(`Sure, give me a second to find some news. 
                  Also, if you are looking for a particular news, be specific 
                  about the title.`);
            const res = News(newsItems);
            res.then(d => { return setNewsData(d);});
          },
        },
        {
          command: "Video search for *",
          callback: (searchTerm) => {
            talk(`Sure, give me a second to find some videos.`);
            const res = YouTubeAPI(searchTerm);
            res.then(d => { return setYouTubeData(d);});
          },
        },
        {
          command: "Translate * to *",
          callback: (word, tosLanguage) => {
            talk("Okay. Hold on while I get the translation");
            setLanguageWord(word);
            const languageCode = languageList.get(tosLanguage.toLowerCase());
            const res = GoogleTranslate(word.toLowerCase().trim(), languageCode);
            res.then(d => { return setTranslatedWord(d); });
          },
        },
        {
          command: "Add to do *",
          callback: (note) => {
            if(!user){
              return talk("Nice try, you must be logged in to use this feature")
            } else {
              addToDo(note);
              setToDoListItem(note);
              talk("Okay. To do added!!!");
            }
          },
        },
        {
          command: "show to do",
          callback: () => {
            if(!user){
              return talk("Nice try, you must be logged in to use this feature");
            }else {
              setToDoList([]);
              showToDo();
              talk("Okay. Here is your to do!!!");
              setToDoListItem("show to do"); 
            }
          },
        },
        {
          command: "Delete from to do *",
          callback: (todo) => {
            if(!user){
              return talk("Nice try, you must be logged in to use this feature")
            }else if (toDoListItem === undefined) {
              talk("You must say, add to do, or, show to do. Please refer to commands list");
            } else {
              removeTodo(todo);
              setToDoListItem(todo)
            }
          },
        },
        {
          command: "Commands",
          callback: () => {
            talk("Here are the commands for me to perform");
            setCommandList("show commands");
          },
        },
        {
          command: "Go to *",
          callback: (page) => {
            const searchPage = page.toLowerCase();
            if(searchPage === "home"){
              history.push("/");
            }else if(searchPage === "video chat"){
              history.push("/video-chat");
            }else if(searchPage === "chat"){
              history.push("/chat-room");
            }else if(searchPage === "trivia"){
              history.push("/trivia");
            }else if(searchPage === "contact us"){
              history.push("/contact-us");
            }else if(searchPage === "login"){
              history.push("/login");
            }else if(searchPage === "sign up"){
              history.push("/sign-up");
            }else{
              talk("I didn't understand. Please speak clearly and choose one of the following pages names on the navbar.");
            }
          },
        },
        {
          command: "pause",
          callback: () => {
            window.speechSynthesis.pause();
          },
        },
        {
          command: "resume",
          callback: () => {
            window.speechSynthesis.resume();
          },
        },
        {
          command: "close",
          callback: () => {
            stopListening();
          },
        },
      ];
    

    const { transcript, resetTranscript } = useSpeechRecognition({ commands });
    const [isListening, setIsListening] = useState(false);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        // hide this key
        const speechlyAppID = process.env.REACT_APP_SpeechlyAppID;
        const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(speechlyAppID);
        SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
        // return (
        //   <Alert severity="error">
        //     <AlertTitle>
        //       Browser is not Support Speech Recognition.
        //     </AlertTitle>
        //     <strong>
        //       For best experience please use Google Chrome or Safari
        //     </strong>
        //   </Alert>
        // );
    }

    const startListening = () => {
        setIsListening(true);
        SpeechRecognition.startListening({
        continuous: true,
        });
        talk("Hello, what do you, want to do? To get started, say commands");
    };

    const stopListening = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
        resetTranscript();
        window.speechSynthesis.cancel();
    };

    const handleOpen = (data) => {
        setOpen(true);
        setData(data);
    };

    const handleClose = () => {
        setData()
        setOpen(false);
    };

    const handleBookClose = () => {
        setBooksData()
        setOpen(false);
    };

    const handleWeatherClose = () => {
        setWeatherData();
        setOpen(false);
    }

    const handleNewsClose = () => {
      setNewsData();
      setOpen(false);
    }

    const handleYouTubeClose = () => {
      setYouTubeData();
      setOpen(false);
    }

    const handleTranslateClose = () => {
      setLanguageWord();
      setTranslatedWord();
      setOpen(false);
    }

    const handleToDoClose = () => {
      setToDoListItem();
      setOpen(false);
    }

    const handleCommandsClose = () => {
      setCommandList();
      setOpen(false);
    }

    const addToDo = async (data) => {
      const todoData = {username: user.username, note: data};
      const list = await AIStudyAPI.createTodo(todoData);
      setToDoList(toDoList => [...toDoList, list.note])
    }

    const showToDo = async () => {
      const allTodos = await AIStudyAPI.getAllTodo(user.username);
      Object.values(allTodos).map(
        v => setToDoList(toDoList => [...toDoList, v.note])
      );
    }

    const removeTodo = async (todo) => {
      if(!todo){
        try{
          await AIStudyAPI.deleteTodo(todo);
          setToDoList(toDoList => toDoList.filter((item) => item !== todo));
          talk("Okay. To do Deleted!!!");
        }catch(error){
          talk("Error while deleting");
        }
      }else {
        try{
          await AIStudyAPI.deleteTodo(todo);
          setToDoList(toDoList => toDoList.filter((item) => item !== todo));
          talk("Okay. To do Deleted!!!");
        }catch(error){
          talk("I am sorry, to do note does not exist");
        }
      }
    }


    return (
      <>
      {commandsList ? <Commands open={handleOpen} handleCommandsClose={handleCommandsClose}/> : null}
      {toDoListItem ? <ToDo handleOpen={handleOpen} handleToDoClose={handleToDoClose} toDoList={toDoList} removeTodo={removeTodo} /> : null}
      {languageWord ? <Translation handleOpen={handleOpen} handleTranslateClose={handleTranslateClose} word={languageWord} translatedWord={translatedWord}/> : null}
      {weatherData ? <WeatherModal handleOpen={handleOpen} handleWeatherClose={handleWeatherClose} icon={icon} name={name} temp={temp} description={description} /> : null}
      {youtubeData ? <YouTubeModal handleOpen={handleOpen} handleBookClose={handleYouTubeClose} youtubeData={youtubeData} /> : null}
      {booksData ? <BooksModal handleOpen={handleOpen} handleBookClose={handleBookClose} booksData={booksData}/> : null}
      {newsData ? <NewsModal handleOpen={handleOpen} handleNewsClose={handleNewsClose} news={newsData} /> : null}
      {data ? <CustomModal handleOpen={handleOpen} handleClose={handleClose} data={data}/> : null}
      <Mic startListening={startListening} isListening={isListening} stopListening={stopListening} transcript={transcript}/>
      </>
  )
}




export default RebeccaBtn

