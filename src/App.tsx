import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Train } from "./components/Train/Train";

function App() {
  const BOARD_LENGTH = 10;
  const [direction, setDirection] = useState("right");
  const [train, setTrain] = useState([
    { x: 3, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);

  const pressKeyHandler = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        setDirection("right");
        break;
      case "ArrowLeft":
        setDirection("left");
        break;
      case "ArrowUp":
        setDirection("up");
        break;
      case "ArrowDown":
        setDirection("down");
        break;
      default:
        break;
    }
  }, []);

  const trainMoveHandler = useCallback(() => {
    const newTrain = [...train];
    const trainHead = { ...newTrain[0] };

    switch (direction) {
      case "right":
        trainHead.x + 1 > 9 ? (trainHead.x = 0) : (trainHead.x += 1);
        break;
      case "left":
        trainHead.x - 1 < 0 ? (trainHead.x = 9) : (trainHead.x -= 1);
        break;
      case "up":
        trainHead.y - 1 < 0 ? (trainHead.y = 9) : (trainHead.y -= 1);
        break;
      case "down":
        trainHead.y + 1 > 9 ? (trainHead.y = 0) : (trainHead.y += 1);
        break;
      default:
        break;
    }
    newTrain.unshift(trainHead);
    if (newTrain.length > 1) {
      newTrain.pop();
    }
    setTrain(newTrain);
  }, [train, direction]);

  useEffect(() => {
    const moveInterval = setInterval(trainMoveHandler, 200);
    return () => {
      clearInterval(moveInterval);
    };
  }, [trainMoveHandler]);

  useEffect(() => {
    document.addEventListener("keydown", pressKeyHandler);
    return () => {
      document.removeEventListener("keydown", pressKeyHandler);
    };
  }, [pressKeyHandler]);

  return (
    <div className='game'>
      <h1>Train game</h1>
      <div className='gameBoard'>
        {Array.from({ length: BOARD_LENGTH * BOARD_LENGTH }, (_, i) => (
          <div className='item' key={i}>
            {train.some(
              (element) =>
                element.x === i % BOARD_LENGTH &&
                element.y === Math.floor(i / BOARD_LENGTH)
            ) && <Train />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
