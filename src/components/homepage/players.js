import React, {useState, useEffect} from 'react';
import {database} from '../../firebase/config';

import Button from './Button';
import Status from './Status';

const Players = ({player, sendRequest}) => {
  const [status, setStatus] = useState();
  useEffect(() => {
    database.ref('onlineUsers').on('value', (snapshot) => {
         if(snapshot.child(player.userId).exists()){
            setStatus('Online')
          } else {
            setStatus('Offline')
          }

    })
    return (() => database.ref('onlineUsers').off('value', (snapshot) => {
      if(snapshot.child(player.userId).exists()) {
        setStatus('Online')
      } else {
        setStatus('Offline')
      }
}))
  },[player])
  return(<li>
            <div className="playerName">
                      <span>{player.username}</span> 
                      <Status status={status}/> 
            </div> 
            <Button sendRequest={() => sendRequest(player)}/>
    </li>)

}

export default Players;