import React from 'react';

const Players = ({player, clickHandler}) => {
  
  return(<li><div className="playerName"><span>{player}</span> <span className="status">Offline</span></div> <button onClick={clickHandler}>Invite</button></li>)

}

export default Players;