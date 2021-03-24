import React, {useState} from 'react';
import Square from './cells';
import useCheck from './useCheck';

const Board = ({squares, handleClick, currentTurn}) => {

 const clickhandler = (index) => {
      handleClick(index)
 }

  return (
       <div className={currentTurn? 'game-board o-turn':'game-board x-turn'} id="game-board">
              {squares.map((squareStyle,index) => {
                return (<Square key={index} squareStyle={squareStyle} clickhandler={() => clickhandler(index)}/>)
              })
              }
    
          </div>)
          
        
  }



export default Board;