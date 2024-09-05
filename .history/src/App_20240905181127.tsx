import { useState } from "react";
import "./App.css"; // For styles if you want to add them separately

const App = () => {
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill("")));
  const [typePlayer, setTypePlayer] = useState("x");

  const play = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== "") {
      alert("Try again!");
      return;
    }

    const newBoard = board.map((row, rIdx) =>
      row.map((col, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          return typePlayer;
        }
        return col;
      })
    );

    setBoard(newBoard);
    setTypePlayer(typePlayer === "x" ? "o" : "x");

    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winConditions = [
      // Rows
      [
        { r: 0, c: 0 },
        { r: 0, c: 1 },
        { r: 0, c: 2 },
      ],
      [
        { r: 1, c: 0 },
        { r: 1, c: 1 },
        { r: 1, c: 2 },
      ],
      [
        { r: 2, c: 0 },
        { r: 2, c: 1 },
        { r: 2, c: 2 },
      ],
      // Columns
      [
        { r: 0, c: 0 },
        { r: 1, c: 0 },
        { r: 2, c: 0 },
      ],
      [
        { r: 0, c: 1 },
        { r: 1, c: 1 },
        { r: 2, c: 1 },
      ],
      [
        { r: 0, c: 2 },
        { r: 1, c: 2 },
        { r: 2, c: 2 },
      ],
      // Diagonals
      [
        { r: 0, c: 0 },
        { r: 1, c: 1 },
        { r: 2, c: 2 },
      ],
      [
        { r: 0, c: 2 },
        { r: 1, c: 1 },
        { r: 2, c: 0 },
      ],
    ];

    winConditions.forEach((condition) => {
      const [a, b, c] = condition;
      if (
        board[a.r][a.c] !== "" &&
        board[a.r][a.c] === board[b.r][b.c] &&
        board[a.r][a.c] === board[c.r][c.c]
      ) {
        alert(`${board[a.r][a.c].toUpperCase()} wins!`);
      }
    });
  };

  return (
    <div className="container">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="col2"
              onClick={() => play(rowIndex, colIndex)}
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {col === "x" && <img src="/assets/x.png" alt="X" />}
              {col === "o" && <img src="/assets/o.png" alt="O" />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
