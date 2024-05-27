import { useState } from "react";

export default function Player({ initPlayerName, playerSymbol, isActive,onPlayerChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initPlayerName);

  let editSaveText = isEditing ? "Save" : "Edit";

  function OnEditSave() {
    setIsEditing((isEditing) => !isEditing);
    if(isEditing)
        {
            onPlayerChange(playerSymbol,playerName);
        }
  }

  let playerSlot = isEditing ? (
    <input
      type="text"
      required
      value={playerName}
      onChange={(event) => setPlayerName(event.target.value)}
    ></input>
  ) : (
    <span className="player-name">{playerName}</span>
  );

  return (
    <>
      <li className={isActive ? 'active' : ''}>
        <span className="player">
          {playerSlot}
          <span className="player-symbol">{playerSymbol}</span>
        </span>
        <button onClick={OnEditSave}>{editSaveText}</button>
      </li>
    </>
  );
}
