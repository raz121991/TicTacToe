import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
import Scoreboard from "./components/ScoreBoard";

const initialPlayersSlots = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getCurrentPlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";

  return currentPlayer;
}



const playersData = { X: "Player 1", O: "Player 2" };
const playersScores = {X:0,O:0};

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const [players, setPlayers] = useState(playersData);
  const currentPlayer = getCurrentPlayer(gameTurns);

  let playersSlots = [...initialPlayersSlots.map((innerArr) => [...innerArr])];

  if (gameTurns.length > 0) {
    for (let turn of gameTurns) {
      playersSlots[turn.square.row][turn.square.col] = turn.player;
    }
  }

  let winner = getWinner(playersSlots, players);
  let draw = gameTurns.length == 9 && !winner;

  function handlePlayersChange(symbol, playerName) {
    setPlayers((oldPlayers) => {
      return { ...oldPlayers, [symbol]: playerName };
    });
  }
  function handleClick(rowIndex, slotIndex) {
    setGameTurns((prevGameTurns) => {
      let currentPlayer = getCurrentPlayer(prevGameTurns);

      const updatedGameTurns = [
        { square: { row: rowIndex, col: slotIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];
      return updatedGameTurns;
    });
  }

  function getWinner(playersSlots, players) {
    let winner = null;
    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSlot =
        playersSlots[combination[0].row][combination[0].column];
      const secondSquareSlot =
        playersSlots[combination[1].row][combination[1].column];
      const thirdSquareSlot =
        playersSlots[combination[2].row][combination[2].column];
  
      if (
        firstSquareSlot &&
        firstSquareSlot === secondSquareSlot &&
        firstSquareSlot === thirdSquareSlot
      ) {
        winner = players[firstSquareSlot];
        playersScores[firstSquareSlot] = playersScores[firstSquareSlot] + 1;
      }
    }
    return winner;
  }


  function handleReset() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initPlayerName={players.X}
            playerSymbol="X"
            isActive={currentPlayer === "X"}
            onPlayerChange={handlePlayersChange}
          />
          <Player
            initPlayerName={players.O}
            playerSymbol="O"
            isActive={currentPlayer === "O"}
            onPlayerChange={handlePlayersChange}
          />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onReset={handleReset} />}
        <GameBoard onHandleClick={handleClick} gameBoard={playersSlots} />
      </div>
      <Scoreboard scores  = {playersScores} />
      <Log gameTurns={gameTurns} players={players} />
    </main>
  );
}

export default App;
