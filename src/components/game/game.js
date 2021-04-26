import React, {useState, useEffect} from 'react';
import useCheck from './useCheck';
import Scoreboard from './scoreboard';
import Board from './board';
import ResultBoard from './resultBoard';
import {database} from '../../firebase/config';
import './game.css';

  const CurrentPlayer = ({user, currentPlayer, opponent, currentTurn}) => {
    let sign = currentTurn? "O":"X";
      return (
        <div className="score-area">
                        {currentPlayer !== user? `Your Turn(${sign})`:`${opponent}'s Turn(${sign})` }    
                         <div className="logo">
                            {currentPlayer !== user? <i className="far fa-play-circle"></i>: <i className="far fa-pause-circle"></i>}  
                         </div>                                          
        </div>     
      )
  }

  const Game = ({user, opponent, hideGameBoard, gameKey}) => {
        const cellRef = database.ref(`Games/${gameKey}`);
        const {winCheck} = useCheck();
        const [showResult, setShowResult] = useState(false);
        const [currentplayer, setCurrentPlayer] = useState();
        const [squares, setSquares] = useState(Array(9).fill(null));
        const [winner, setWinner] = useState();
        const [score,setScore] = useState({[user]:0,[opponent]:0,draw:0});
        const [winningLine, setWinningLine] = useState();
        const [currentTurn, setCurrentTurn] = useState();

       const switchTurn = () => {
          cellRef.child("turn").update({currentTurn: !currentTurn})
       }
       const resetTurn = () => {
        cellRef.child("turn").update({currentTurn: false})
       }
      const playAgain = () => {
           cellRef.child("result").update({winningLine: ""});
           cellRef.child("result").update({showResult: false});
           cellRef.child("result").update({winner: ""});
            for(let i = 0; i < 9; i++){
              let currentCell = "cell" + i;
              cellRef.child("cells").update({[currentCell]: ""})
            }      
        }
        
        const resultDisplay = (username, winner) => {
          cellRef.child("result").update({showResult: true});
          cellRef.child("result").update({winner: winner});
          let newScore = score[winner] + 1;
          cellRef.child("score").update({[winner]: newScore});
          if (!currentTurn){
                    cellRef.child("turn").update({lastMove: username})                  
                  }
          resetTurn();
        }
        const handleClick = (index) => {                
                const squaresCopy = [...squares];
                if(squaresCopy[index]) return;
                squaresCopy[index] = currentTurn? 'square o-sign':'square x-sign';                            
                let currentCell = "cell" + index;
                cellRef.child("cells").update({[currentCell]: squaresCopy[index]})
                let winDetails = winCheck(squaresCopy);
                if(winDetails){
                  cellRef.child("result").update({winningLine: winDetails});
                  resultDisplay(user,user);
                  return
                } else {
                  if(squaresCopy.every(item => item)){
                    resultDisplay(user,'draw');           
                    return
                  };
                }
                switchTurn();
                cellRef.child("turn").update({lastMove: user})
        }

        useEffect(() => {            
              cellRef.child("turn/currentTurn").on('value', (snapshot) => {
                    setCurrentTurn(snapshot.val());             
              });

              cellRef.child("turn/lastMove").on('value', (snapshot) => {
                setCurrentPlayer(snapshot.val());             
              });

              cellRef.child("result/winningLine").on('value', (snapshot) => {
                setWinningLine(snapshot.val());             
              });
              cellRef.child("result/showResult").on('value', (snapshot) => {
                setShowResult(snapshot.val());             
              });

              cellRef.child("result/winner").on('value', (snapshot) => {
              setWinner(snapshot.val());             
              });

              cellRef.child('cells').on('value', (snapshot) => {
                let arr = [];
                snapshot.forEach(function(childSnapshot){
                      arr.push(childSnapshot.val())
                })
                setSquares(arr);                     
              });
              cellRef.child('score').on('value',(snapshot) => {
                setScore(snapshot.val());             
                })
             return function cleanup() {
                  cellRef.child("turn/currentTurn").off('value', (snapshot) => {
                    setCurrentTurn(snapshot.val());             
                    });

                  cellRef.child("turn/lastMove").off('value', (snapshot) => {
                   setCurrentPlayer(snapshot.val());             
                   });

                  cellRef.child("result/winningLine").off('value', (snapshot) => {
                  setWinningLine(snapshot.val());             
                   });
                  cellRef.child("result/showResult").off('value', (snapshot) => {
                  setShowResult(snapshot.val());             
                  });

                  cellRef.child("result/winner").off('value', (snapshot) => {
                  setWinner(snapshot.val());             
                  });

                 cellRef.child('cells').off('value', (snapshot) => {
                 let arr = [];
                 snapshot.forEach(function(childSnapshot){
                      arr.push(childSnapshot.val())
                  })
                 setSquares(arr);                     
                })
                cellRef.child('score').off('value',(snapshot) => {
                  setScore(snapshot.val());             
                  })
              }
             }
             ,[]);

        return(
          <div className="gameArea">
              <span onClick={hideGameBoard}><i className="fas fa-times fa-2x"></i></span>
              <h1>Tic-Tac-Toe</h1>
              <Scoreboard username={user} opponent={opponent} score={score}/> 
              
              {!showResult && <CurrentPlayer user={user} currentPlayer={currentplayer} opponent={opponent} currentTurn={currentTurn}/>}
              {showResult && <ResultBoard user={user} winner={winner} playAgain={playAgain}/>}
              <div className="screenReference">
                  <Board squares={squares} handleClick={handleClick} currentTurn={currentTurn} winningLine={winningLine}/>
                  <div className={showResult? "screenY":""}></div>
                  <div className={currentplayer === user? "screenY":""}></div> 
                               
              </div>
          </div>
        )
}
export default Game;