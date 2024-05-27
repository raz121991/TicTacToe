export default function Log({gameTurns,players}){
    
    return <ol id="log">
     {gameTurns.map((turn,turnIndex) => <li key={`${turn.square.row}${turn.square.col}`}>{players[turn.player]} has clicked in row {turn.square.row + 1} and column {turn.square.col + 1}</li>)}
    </ol>
}