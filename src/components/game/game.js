import React, {useState, useEffect} from 'react';
import useCheck from './useCheck';
import Board from './board';
import ResultBoard from './resultBoard';
import database from '../../firebase/config';
import './game.css';

  const CurrentPlayer = ({user, currentPlayer, friendName, currentTurn}) => {
      return (
        <div className="score-area">                                   
                         {currentPlayer !== user.username? "Your Turn":`${friendName}'s turn` }
                         <div className={currentPlayer === user.username? 'screen':'' }></div> 
                         <div>{currentTurn? "O":"X"}</div>                     
        </div>     

      )

  }
  
  const Game = ({user, friendName}) => {
        const cellRef = database.ref("GameDetails");
        const {winCheck} = useCheck();
        const [showResult, setShowResult] = useState(false);
        const [currentplayer, setCurrentPlayer] = useState();
        const [squares, setSquares] = useState(Array(9).fill(null));
        const [winner, setWinner] = useState();
        const [winningLine, setWinningLine] = useState();
        const [currentTurn, setCurrentTurn] = useState();


       const switchTurn = () => {
          cellRef.child("Turn").update({CurrentTurn: !currentTurn})
       }

      const playAgain = () => {
           cellRef.child("Result").update({WinningLine: ""});
           cellRef.child("Result").update({showResult: false});
           cellRef.child("Result").update({Winner: ""});
            for(let i = 0; i < 9; i++){
              let currentCell = "cell" + i;
              cellRef.child("Cells").update({[currentCell]: ""})
            }
            switchTurn();
        }

        
        const handleClick = (index) => {                
                const squaresCopy = [...squares];
                if(squaresCopy[index]) return;
                squaresCopy[index] = currentTurn? 'square o-sign':'square x-sign';                            
                let currentCell = "cell" + index;
                cellRef.child("Cells").update({[currentCell]: squaresCopy[index]})
                switchTurn();
                let winDetails = winCheck(squaresCopy);
                if(winDetails){
                  cellRef.child("Result").update({WinningLine: winDetails});
                  cellRef.child("Result").update({showResult: true});
                  cellRef.child("Result").update({Winner: user.username});
                } else {
                  if(squaresCopy.every(item => item)){
                    cellRef.child("Result").update({showResult: true});
                    cellRef.child("Result").update({Winner: 'Draw'});
                  };
                }
                cellRef.child("Turn").update({LastMove: user.username})

        }

        useEffect(() => {
              
              cellRef.child("Turn/CurrentTurn").on('value', (snapshot) => {
                    setCurrentTurn(snapshot.val());             
              });

              cellRef.child("Turn/LastMove").on('value', (snapshot) => {
                setCurrentPlayer(snapshot.val());             
              });

              cellRef.child("Result/WinningLine").on('value', (snapshot) => {
                setWinningLine(snapshot.val());             
              });

              cellRef.child("Result/showResult").on('value', (snapshot) => {
                setShowResult(snapshot.val());             
              });

              cellRef.child("Result/Winner").on('value', (snapshot) => {
              setWinner(snapshot.val());             
              });

              cellRef.child('Cells').on('value', (snapshot) => {
                let arr = [];
                snapshot.forEach(function(childSnapshot){
                      arr.push(childSnapshot.val())
                })
                setSquares(arr);                     
              })
             
             }
        ,[]);

        return(
          <div className="gameArea">
              <h1>Game</h1>
              <CurrentPlayer user={user} currentPlayer={currentplayer} friendName={friendName} currentTurn={currentTurn}/>
              <Board squares={squares} handleClick={handleClick} currentTurn={currentTurn} winningLine={winningLine}/>
              {showResult && <ResultBoard user={user} winner={winner} playAgain={playAgain}/>}
              
          </div>
        )
}
export default Game;