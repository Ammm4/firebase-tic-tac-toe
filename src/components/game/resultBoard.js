import React from 'react';

const ResultBoard = ({winner, playAgain}) => {
    return ( <div className="resultBoard">
                <div className="results">{winner}</div>
                <button onClick={() => playAgain()}>Play Again</button>
                <button>Close Game</button>
            </div>)
}

export default ResultBoard;