import { useState } from "react";



export default function GameBoard({ onHandleClick, gameBoard }) {


  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((slot, slotIndex) => (
              <li key={slotIndex}>
                <button  disabled={slot !== null} onClick={() => onHandleClick(rowIndex, slotIndex)}>
                  {slot}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
