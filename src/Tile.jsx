import {correctColor, misplacedColor, wrongColor} from "./gConstants"

const Tile = ({letter, tileState}) => {
  let stateColor;

  switch (tileState) {
    case "wrong":
      stateColor = wrongColor;
      break;
    case "misplaced":
      stateColor = misplacedColor;
      break;
    case "correct":
      stateColor = correctColor;
      break;
    default:
      stateColor = "";
  }

  return <div className="font-bold w-10 h-10 flex items-center justify-center border-2 text-white"
              style={{backgroundColor: stateColor}}>
    {letter}
  </div>
}

export default Tile;