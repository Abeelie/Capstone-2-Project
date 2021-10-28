const TranslationTalk  = (text, lang) => {
    const talk = new SpeechSynthesisUtterance();
    talk.lang = lang;
    talk.text = text;
    talk.volume = 0.5;
    window.speechSynthesis.speak(talk);
}


export { TranslationTalk }