import { useState } from "react";
import "./App.css";

const initBoard = () =>
  Array(3)
    .fill("")
    .map(() => Array(3).fill(""));

const App = () => {
  const [board, setBoard] = useState<string[][]>(initBoard());
  const [typePlayer, setTypePlayer] = useState<"x" | "o">("x");
  const [winner, setWinner] = useState<string | null>(null);

  const play = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] !== "" || winner) {
      return;
    }

    const newBoard = board.map((row, rIdx) =>
      row.map((col, cIdx) => {
        return rIdx === rowIndex && cIdx === colIndex ? typePlayer : col;
      })
    );

    setBoard(newBoard);
    checkWinner(newBoard);
    setTypePlayer(typePlayer === "x" ? "o" : "x");
  };

  const checkWinner = (board: string[][]) => {
    const winConditions = [
      // Rows, Columns, Diagonals
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

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (
        board[a.r][a.c] !== "" &&
        board[a.r][a.c] === board[b.r][b.c] &&
        board[a.r][a.c] === board[c.r][c.c]
      ) {
        setWinner(board[a.r][a.c]);
        return;
      }
    }

    // Check for a draw
    if (board.flat().every((cell) => cell !== "")) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(initBoard());
    setWinner(null);
    setTypePlayer("x");
  };

  return (
    <div className="container">
      {winner ? (
        <div className="container">
          <h2>
            {winner === "Draw"
              ? "It's a draw!"
              : `${winner.toUpperCase()} wins!`}
          </h2>
          <button onClick={resetGame}>Restart</button>
        </div>
      ) : (
        <h2>Current Player: {typePlayer.toUpperCase()}</h2>
      )}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((col, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="col"
                onClick={() => play(rowIndex, colIndex)}
              >
                {col === "x" && (
                  <img className="w40" src="/assets/x.png" alt="X" />
                )}
                {col === "o" && (
                  <img className="w40" src="/assets/o.png" alt="O" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
