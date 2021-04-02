import React from 'react';
import Square from './cells';
import Lines from './lines';


const Board = ({squares, handleClick, currentTurn, winningLine}) => {

 const clickhandler = (index) => {
      handleClick(index)
 }
  return (
       <div className={currentTurn? 'game-board o-turn':'game-board x-turn'} id="game-board">
              {squares.map((squareStyle,index) => {
                return (<Square key={index} squareStyle={squareStyle} clickhandler={() => clickhandler(index)}/>)
              })
              }
                       
            { <Lines winningLine={winningLine}/>}
        </div>
        )                 
}

export default Board;