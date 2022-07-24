import { useState } from "react";

function App() {
  const board = [
    { id: 0, value: "" },
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
    { id: 5, value: "" },
    { id: 6, value: "" },
    { id: 7, value: "" },
    { id: 8, value: "" },
  ];
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  const [gameStatusColor, setGameStatusColor] = useState("statusTurn");
  const [cells, setCells] = useState(board);
  const [moves, setMoves] = useState(1);
  const [matches, setMatches] = useState(1);
  const [winsO, setWinsO] = useState(0);
  const [winsX, setWinsX] = useState(0);
  const [activePlayer, setActivePlayer] = useState("O");
  const [gameStatusMessage, setGameStatusMessage] = useState("O's Turn");
  
  const againGame = () => {
    setCells(board);
    if(gameStatusMessage.includes("Turn") === false) setMatches((matches) => matches + 1);
    setMoves(1);
    toggleActivePlayer();
    setGameStatusMessage(`${activePlayer}'s Turn`);
    setGameStatusColor("statusTurn");
  };

  const restartGame = () => {
    setCells(board);
    setMatches(1);
    setWinsO(0);
    setWinsX(0);
    toggleActivePlayer();
    setGameStatusMessage(`${activePlayer}'s Turn`);
    setGameStatusColor("statusTurn");
  };

  const setValue = (cell) => {
    if (cell.value) return; // if this cell not empty
    cell.value = activePlayer;
    setMoves((moves) => moves + 1);
    changeGameStatus();
    if (!checkWinner()) toggleActivePlayer();

    if (checkWinner()) {
      activePlayer === "O"
        ? setWinsO((winsO) => winsO + 1)
        : setWinsX((winsX) => winsX + 1);
    }
  };

  const toggleActivePlayer = () =>
    setActivePlayer(activePlayer === "O" ? "X" : "O");

  const checkWinner = () => {
    return winConditions.some((condition) => {
      let count = 0;
      condition.forEach((cell) => {
        if (cells[cell].value === activePlayer) {
          count++;
        }
      });
      if (count === 3) {
        return true;
      }
      return false;
    });
  };

  const changeGameStatus = () => {
    if (checkWinner()) {
      setGameStatusMessage(`${activePlayer}'s Wins`);
      return setGameStatusColor("statusWin");
    } else if (moves === 9) {
      setGameStatusMessage("There's no winner!");
      return setGameStatusColor("statusDraw");
    }
    // toggleActivePlayer();
    setGameStatusMessage(`${activePlayer}'s Turn`);
    return setGameStatusColor("statusTurn");
  };

  return (
    <div>
      <h1>Tic-Tac-Toe Game</h1>
      <h2 className="statistics">
        <span className="playerNames">X</span> has
        <span className="results">{winsX}</span> wins | Match
        <span className="results">{matches}</span> |{" "}
        <span className="playerNames">O</span> has
        <span className="results">{winsO}</span> wins
      </h2>
      <div>
        <div className={`gameStatus ${gameStatusColor}`}>
          {gameStatusMessage.includes("Turn") === true ? `${activePlayer}'s Turn` : gameStatusMessage}
        </div>
        <div className="grid">
          {cells.map((cell, index) => (
            <button
              className="cell"
              key={index}
              onClick={() => setValue(cell)}
              disabled={checkWinner()}
            >
              {cell.value}
            </button>
          ))}
        </div>
      </div>
      <button className="restart" onClick={restartGame}>
        Restart
      </button>
      <button className="again" onClick={againGame}>
        Again
      </button>
    </div>
  );
}

export default App;
