import React from 'react';

const Scoreboard = ({ username, opponent, score }) => {
  return(
    <div className="scoreboard">
      <h2>Score</h2>
      <div className="score-details">
        <h5>You : { score[username] }</h5>
        <h5>{ opponent } : { score[opponent] }</h5>
        <h5>Draw : { score.draw }</h5>
      </div>   
    </div>
  )
}

export default Scoreboard;