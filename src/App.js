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

function App() {
  const boxCount = 20;
  const pixelArr = Array.from(Array(boxCount).keys());

  const [newColorArr, setNewColorArr] = useState(["0:1", "0:2", "0:3", "0:4"]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let tempArr = [];

      for (let i = 0; i < newColorArr.length; i++) {
        let newVal = getNxtHead(newColorArr[i]);
        tempArr.push(newVal);
      }

      setCount((prev) => prev + 1);
      setNewColorArr(tempArr);
    }, 100);

    // if (count >= 99) {
    //   clearInterval(intervalId);
    // }

    return () => clearInterval(intervalId);
  }, [count]);

  const getNxtHead = (headStr) => {
    const headArr = headStr.split(":");
    let head_y = parseInt(headArr[0]);
    let head_x = parseInt(headArr[1]);

    head_x = head_x === boxCount ? 0 : head_x + 1;
    head_y =
      head_y === boxCount ? 0 : head_x === boxCount ? head_y + 1 : head_y;
    const newHead = `${head_y.toString()}:${head_x.toString()}`;

    return newHead;
  };

  return (
    <div className="App">
      <div style={colCss}>
        {pixelArr.map((_, yIdx) => {
          return (
            <div style={rowCss} key={yIdx}>
              {pixelArr.map((_, xIdx) => {
                return (
                  <div
                    style={
                      newColorArr.includes(
                        `${yIdx.toString()}:${xIdx.toString()}`
                      )
                        ? pixelCss_new
                        : pixelCss_def
                    }
                    key={xIdx}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
