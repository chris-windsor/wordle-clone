import './App.css';
import {useEffect, useState} from "react";
import Game from "./Game";

const wordFile = require("./words.txt");

function App() {
  // Constant states
  const [possibleWords, setPossibleWords] = useState([]);
  const [correctWord, setCorrectWord] = useState([]);

  // Load all those wordssss...
  useEffect(() => {
    fetch(wordFile).then(res => res.text()).then(res => {
      const words = res.split("\n");
      const randomIndex = Math.floor(Math.random() * (words.length + 1));

      setPossibleWords(words);
      setCorrectWord(words[randomIndex].split(""));
    });
  }, [])

  return <Game wordList={possibleWords} correctWord={correctWord}/>
}

export default App;
