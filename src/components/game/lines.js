import React from 'react';
//

const Lines = ({ winningLine }) => {
  return (
   <>
     <div className="leftDiagonal" style={ { zIndex: winningLine === "leftDiagonal" ? '1' : '' } }>
       <div className="leftInner" style={ { width: winningLine === "leftDiagonal" ? '100%' : '' } }></div>
     </div>
     <div className="rightDiagonal" style={ { zIndex: winningLine === "rightDiagonal" ? '1' : '' } }>
       <div className="rightInner" style={ { width: winningLine === "rightDiagonal" ? '100%': '' } }></div>
     </div>
     <div className="leftColumn" style={ { zIndex: winningLine === "leftColumn" ? '1' : '' } }>
       <div className="innerDiv" style={ { height: winningLine === "leftColumn" ? '100%' : ''} }></div>
     </div>
     <div className="midColumn" style={ { zIndex: winningLine === "midColumn" ? '1' : '' } }>
       <div className="innerDiv" style={ { height: winningLine === "midColumn" ? '100%' : '' } }></div>
     </div>
     <div className="rightColumn" style={ { zIndex: winningLine === "rightColumn" ? '1' : '' } }>
       <div className="innerDiv" style={ { height: winningLine === "rightColumn" ? '100%' : '' } }></div>
     </div>
     <div className="topRow" style={ { zIndex: winningLine === "topRow" ? '1' : '' } }>
       <div className="innerDiv" style={ { width: winningLine === "topRow" ? '100%' : '' } }></div>
     </div>
     <div className="midRow" style={ { zIndex: winningLine === "midRow" ? '1' : '' } }>
       <div className="innerDiv" style={ { width: winningLine === "midRow" ? '100%' : '' } }></div>
     </div>
     <div className="bottomRow" style={ { zIndex: winningLine === "bottomRow" ? '1' : '' } }>
      <div className="innerDiv" style={ { width: winningLine === "bottomRow" ? '100%' : '' } }></div>
     </div>
   </>
 )
}

export default Lines;