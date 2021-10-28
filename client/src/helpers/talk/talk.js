const voice = window.speechSynthesis;

const talk = (text) => {
    const talk = new SpeechSynthesisUtterance();
    const voices = voice.getVoices();
    // console.log(voices)
    talk.voice = voices[2]
    talk.lang = 'en-US';
    talk.text = text;
    talk.volume = 0.5;
    window.speechSynthesis.speak(talk);
}


export { talk }