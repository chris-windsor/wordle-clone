import Tile from "./Tile";

const WordRow = ({active, word, correctWord}) => {
  const wordBlocks = Array.from({length: 5});
  wordBlocks.splice(0, word.length, ...word);

  return <div className="flex flex-row gap-1">
    {wordBlocks.map((letter, letterIdx) => {
      let tileState = "";

      if (!active && word.length) {
        if (letter === correctWord[letterIdx]) {
          tileState = "correct";
        } else if (correctWord.includes(letter)) {
          tileState = "misplaced";
        } else {
          tileState = "wrong";
        }
      }

      return <Tile key={letterIdx} tileState={tileState} letter={letter}/>
    })}
  </div>
}

export default WordRow;
