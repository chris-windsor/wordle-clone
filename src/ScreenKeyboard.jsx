import {correctColor, misplacedColor, wrongColor} from "./gConstants";

const ScreenKeyboard = ({disabledLetters, misplacedLetters, correctLetters, onAdd, onBackspace, onSubmit}) => {
  const rows = [["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], ["A", "S", "D", "F", "G", "H", "J", "K", "L"], ["Z", "X", "C", "V", "B", "N", "M"],]

  const keyColor = (letter) => {
    const isDisabled = disabledLetters.includes(letter);
    const isMisplaced = misplacedLetters.includes(letter);
    const isCorrect = correctLetters.includes(letter);

    let stateColor = "#9b9b9b";

    if (isDisabled) {
      stateColor = wrongColor;
    } else if (isMisplaced) {
      stateColor = misplacedColor;
    } else if (isCorrect) {
      stateColor = correctColor;
    }

    return stateColor;
  }

  return <div className="flex flex-col gap-1">
    {rows.map((row, rowIdx) => <div key={rowIdx} className="flex justify-center gap-1">
      {row.map((letter, letterIdx) => {
        const isDisabled = disabledLetters.includes(letter);

        return <button key={letterIdx} className="w-9 h-9 border-2 rounded" style={{backgroundColor: keyColor(letter)}}
                       disabled={isDisabled} onClick={() => onAdd(letter)}>{letter}</button>
      })}
    </div>)}
    <button className="h-10 border-2 bg-amber-700" onClick={onBackspace}>BACKSPACE</button>
    <button className="h-10 border-2 bg-teal-400" onClick={onSubmit}>SUBMIT</button>
  </div>
}

export default ScreenKeyboard;

