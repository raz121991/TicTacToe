import React from "react";

const Scoreboard = ({ scores }) => {
  const symbols = Object.keys(scores);

  return (
    <div className="scoreboard">
      <h2 className="score-label">Score</h2>
      <div className="score-rows">
        {symbols.map((symbol, index) => (
          <React.Fragment key={symbol}>
            <div className="score-column" key={symbol}>
              <p className="player-symbol-score">{symbol}</p>
              <p className="player-score">{scores[symbol]}</p>
            </div>
            {index < symbols.length - 1 && <div className="separator"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
