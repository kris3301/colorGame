import React, { useEffect, useState } from "react";
import "./App.css";

const rowCss = { display: "flex", gap: "5px" };
const colCss = { display: "flex", flexDirection: "column", gap: "5px" };

const pixelCss_def = {
  width: "10px",
  height: "10px",
  backgroundColor: "#6666eb",
};
const pixelCss_new = { width: "10px", height: "10px", backgroundColor: "red" };
const pixelCss_food = {
  width: "10px",
  height: "10px",
  backgroundColor: "black",
};
const boxCount = 20;
const pixelArr = Array.from(Array(boxCount).keys());

function App() {
  const [snakeArr, setSnakeArr] = useState([]);
  const [snakeLen, setSnakeLen] = useState(3);
  const [foodAxis, setFoodAxis] = useState("5:5");
  const [pathStr, setPathStr] = useState("RIGHT");

  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let tempArr = [...snakeArr];
      let tempSnakeLen = snakeLen;
      let newHeadArr = (snakeArr[0] || "0:0").split(":");
      let new_Y_idx = parseInt(newHeadArr[0]);
      let new_X_idx = parseInt(newHeadArr[1]);

      if (pathStr === "RIGHT") {
        new_X_idx = new_X_idx + 1;
      } else if (pathStr === "LEFT") {
        new_X_idx = new_X_idx - 1;
      } else if (pathStr === "UP") {
        new_Y_idx = new_Y_idx - 1;
      } else if (pathStr === "DOWN") {
        new_Y_idx = new_Y_idx + 1;
      }

      new_X_idx =
        new_X_idx < 0 ? boxCount - 1 : new_X_idx >= boxCount ? 0 : new_X_idx;
      new_Y_idx =
        new_Y_idx < 0 ? boxCount - 1 : new_Y_idx >= boxCount ? 0 : new_Y_idx;
      const newHead = `${new_Y_idx.toString()}:${new_X_idx.toString()}`;

      tempArr = [newHead, ...tempArr];

      if (newHead === foodAxis) {
        let min = 0;
        let max = boxCount - 1;
        tempSnakeLen = tempSnakeLen + 1;

        let food_x = Math.floor(Math.random() * (max - min + 1) + min);
        let food_y = Math.floor(Math.random() * (max - min + 1) + min);
        const food_YX = `${food_y.toString()}:${food_x.toString()}`;
        setFoodAxis(food_YX);
      }

      if (tempArr.length > tempSnakeLen) {
        tempArr.pop();
      }

      setSnakeArr(tempArr);
      setSnakeLen(tempSnakeLen);
      setCount((prev) => prev + 1);
    }, 200);

    // if (count >= 99) {
    //   clearInterval(intervalId);
    // }

    return () => clearInterval(intervalId);
  }, [count, pathStr]);

  const onBtnClick = (btnType) => {
    if (
      (["RIGHT", "LEFT"].includes(pathStr) &&
        ["RIGHT", "LEFT"].includes(btnType)) ||
      (["UP", "DOWN"].includes(pathStr) && ["UP", "DOWN"].includes(btnType))
    ) {
      return;
    }

    setPathStr(btnType);
  };

  return (
    <div className="App">
      <div style={colCss}>
        {pixelArr.map((_, yIdx) => {
          return (
            <div style={rowCss} key={yIdx}>
              {pixelArr.map((_, xIdx) => {
                let tempIdx = `${yIdx.toString()}:${xIdx.toString()}`;
                const pixelColorObj = snakeArr.includes(tempIdx)
                  ? pixelCss_new
                  : tempIdx === foodAxis
                  ? pixelCss_food
                  : pixelCss_def;

                return <div style={pixelColorObj} key={xIdx}></div>;
              })}
            </div>
          );
        })}
      </div>

      <div>
        <button onClick={() => onBtnClick("UP")}>UP</button>

        <div>
          <button onClick={() => onBtnClick("LEFT")}>LEFT</button>
          <button onClick={() => onBtnClick("RIGHT")}>RIGHT</button>
        </div>

        <button onClick={() => onBtnClick("DOWN")}>DOWN</button>
      </div>
    </div>
  );
}

export default App;
