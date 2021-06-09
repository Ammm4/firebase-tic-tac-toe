import React from 'react';
import Players from './players';


const Playersboard = ({players,sendRequest}) => {
  return (
    <div className="playersDisplay">
      <h1>Invite</h1>
      <div style={ { "textAlign":"center","marginTop":"0.7rem" } }><span><i className="fas fa-users"></i> All Players</span> </div>
        <ul className="playersList">
          { players.map((player,index) => {
            return (<Players player={ player } key={ index } sendRequest={sendRequest} />)
          }) }
        </ul>
    </div>
  )

}

export default Playersboard;