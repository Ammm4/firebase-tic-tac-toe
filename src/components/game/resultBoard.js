import React from 'react';

const ResultBoard = ({user, winner, playAgain}) => {
    return (<div className="resultBoard">
            {(winner !== 'Draw')?
                   <div className="results">{winner === user.username? 'You Win!': `${winner} wins!` }</div>:
                   <div className="results">Game Draw!</div>  
                }          
                <button onClick={() => playAgain()}>Play Again</button>
                <button>Close Game</button>
            </div>)
}

export default ResultBoard;