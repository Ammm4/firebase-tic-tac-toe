import React, {useState, useEffect, useRef} from 'react';
import useCheck from './useCheck';
import Board from './board';
import ResultBoard from './resultBoard';
import './game.css';

  const Game = ({friendName}) => {
    
        const {winCheck} = useCheck();
        const [showResult, setShowResult] = useState(false);
        const [player,setPlayer] = useState('You');
        const [winner, setWinner] = useState('')
        const [squares, setSquares] = useState(Array(9).fill(null));
        const [currentTurn, setCurrentTurn] = useState(false);
        const showResultBoard = (result) => {
          setWinner(result)
          setShowResult(true);
        }
    
        const playAgain = () => {
            setShowResult(false);
            setSquares(Array(9).fill(null));
            setPlayer('You');
            setCurrentTurn(false);
        }

        const handleClick = (index) => {
                const squaresCopy = [...squares];
                if(squaresCopy[index]) return;
                squaresCopy[index] = currentTurn? 'square o-sign':'square x-sign'; 
                setSquares(squaresCopy);
                setCurrentTurn(!currentTurn);
                if(winCheck(squaresCopy)){
                  showResultBoard(`${player} win!!`);
                } else {
                  if(squaresCopy.every(item => item)){
                    showResultBoard('Game Draw');
                  };
                }
                {player==='You'? setPlayer(friendName): setPlayer('You')}
        }
        return(
          <div className="gameArea">
              <h1>Game</h1>
              <div className="score-area">
                  <div>Score</div>
                  <div className="scores">
                      <div>You: 0</div>
                      <div>{friendName}: 0</div>
                  </div>        
              </div>
              
              <Board squares={squares} handleClick={handleClick} currentTurn={currentTurn}/>
              {showResult && <ResultBoard winner={winner} playAgain={playAgain}/>}
              
          </div>
        )
}
export default Game;