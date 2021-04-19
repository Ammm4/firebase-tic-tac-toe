import React from 'react';
import Img1 from '../../images/sadface.gif';
const ShowError = ({err, closeRequestIn}) => {

  return(<div>  
           <img src={Img1} alt="loading"/>
           <p>{err}</p>
           <button onClick={() => closeRequestIn()}>Close</button>
         </div>)
}
const ShowRequestIn = ({sender,playGame,rejectGame, gameKey}) => {
  return(
    <div>
        <p>{sender} sent you an invitation.</p>
        <button onClick={() => playGame(sender, gameKey)}>Join</button><button onClick={() => rejectGame(sender, gameKey)}>Decline</button>
    </div>
  )
}

const RequestIn = ({sender,playGame,rejectGame, closeRequestIn, gameKey,err}) => {

  return(
    <div className="invite-form">
      {err? <ShowError err={err} closeRequestIn={closeRequestIn}/> : <ShowRequestIn sender={sender} playGame={playGame} rejectGame={rejectGame} gameKey={gameKey}/>}
    </div>
  )
}

export default RequestIn;