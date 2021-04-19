import React from 'react';

const ResultBoard = ({user, winner, playAgain}) => {
    return (<div className="score-area">
            <h6>Game Over</h6>
            {(winner !== 'draw')?
                   <div className="results blink"><i className="fas fa-trophy"></i> {winner === user.username? 'You Win!': `${winner} wins!` }</div>:
                   <div className="results blink">Match Draw!</div>  
                }          
             <button onClick={() => playAgain()}>Play Again</button>
            </div>)
}

export default ResultBoard;