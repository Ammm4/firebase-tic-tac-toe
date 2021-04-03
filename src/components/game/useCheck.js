import {useState, useEffect} from 'react';

const useCheck = () => {
   const winCheck = (squares) => {
            const matrix = [
                           [0,1,2],
                           [3,4,5],
                           [6,7,8],
                           [0,3,6],
                           [1,4,7],
                           [2,5,8],
                           [0,4,8],
                           [6,4,2]
                           ];
            const winningLine = [
                                 'topRow',
                                 'midRow',
                                 'bottomRow',
                                 'leftColumn',
                                 'midColumn',
                                 'rightColumn',
                                 'leftDiagonal',
                                 'rightDiagonal'
                                ]

            for(let i = 0; i < matrix.length; i++){
               const [a, b, c] = matrix[i];
               if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                  return winningLine[i];
               }
            }
            return null
     }   
  return {winCheck}
}

export default useCheck;


 