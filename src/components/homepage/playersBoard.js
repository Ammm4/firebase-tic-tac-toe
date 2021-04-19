import React from 'react';
import Players from './players';


const Playersboard = ({players,sendRequest}) => {

  const clickHandler = (player) => {
       sendRequest(player);
  }
  
  return (
    <div className="playersDisplay">
                  <h1>Invite</h1>
                  <div><span><i className="fas fa-users"></i> All Players</span> </div>
                    <ul className="playersList">
                      {players.map((player,index) => {
                        return (<Players player={player} key={index} clickHandler={() => clickHandler(player)} />)
                      })}
                    </ul>
   </div>
  )

}

export default Playersboard;