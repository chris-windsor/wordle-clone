import {useState} from "react";
import WordRow from "./WordRow";
import ScreenKeyboard from "./ScreenKeyboard";

const Game = ({wordList, correctWord}) => {
  // Gameplay states
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [activeRowIndex, setActiveRowIndex] = useState(0);
  const [currentGuess, setCurrentGuess] = useState([]);

  // Letter states
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [misplacedLetters, setMisplacedLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);

  const addNextLetter = (newLetter) => {
    if (currentGuess.length === 5) return;
    setCurrentGuess([...currentGuess, newLetter]);
  }

  const removeLastLetter = () => {
    const newGuess = [...currentGuess];
    newGuess.pop();

    setCurrentGuess(newGuess);
  }

  const submitGuess = () => {
    if (currentGuess.length !== 5) return;
    if (!wordList.includes(currentGuess.join(""))) return;

    const newCorrectLetters = currentGuess.filter((letter, letterIndex) => letter === correctWord[letterIndex]);
    setCorrectLetters(newCorrectLetters);

    let newMisplacedLetters = [];
    let newDisabledLetters = [];

    currentGuess.forEach((letter, letterIndex) => {
      if (correctWord.includes(letter)) {
        newMisplacedLetters.push(letter);
      } else {
        newDisabledLetters.push(letter);
      }
    });

    setMisplacedLetters([...misplacedLetters, ...newMisplacedLetters]);
    setDisabledLetters([...disabledLetters, ...newDisabledLetters]);
    setPreviousGuesses([...previousGuesses, currentGuess]);
    setActiveRowIndex(activeRowIndex + 1);
    setCurrentGuess([]);
  }

  return (<div className="flex flex-col items-center bg-gray-800 h-screen p-10">
    <h1 className="text-green-700 text-5xl mt-10 underline">WORDLE</h1>
    <div className="flex flex-col gap-1 m-10">
      {Array.from({length: 6}).map((_, rowIndex) => {
        const rowWord = rowIndex === activeRowIndex ? currentGuess : (previousGuesses[rowIndex] || []);

        return <WordRow key={rowIndex}
                        active={activeRowIndex === rowIndex}
                        disabledLetters={disabledLetters}
                        misplacedLetters={misplacedLetters}
                        word={rowWord}
                        correctWord={correctWord}/>
      })}
    </div>
    <ScreenKeyboard disabledLetters={disabledLetters}
                    misplacedLetters={misplacedLetters}
                    correctLetters={correctLetters}
                    onAdd={addNextLetter}
                    onBackspace={removeLastLetter}
                    onSubmit={submitGuess}/>
  </div>);
}

export default Game;