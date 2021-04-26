import React from 'react';
import Img1 from '../../images/pending1.gif';
import Img2 from '../../images/sadface.gif';

const ShowError = ({error, opponent, requestAgain}) => {
  
  return(<div>
          <img src={Img2} alt="loading"/>
          <p>{error}</p>
          <button onClick={() => requestAgain(opponent)}>Try Again</button>
        </div>)
  
}
const ShowSentRequest = ({opponent, cancelInvitation}) => {
  return(<div>
          <img src={Img1} alt="loading"/>
          <p>Invitation Sent !!</p>
          <p>Waiting for {opponent.username} to join...</p>       
          <button onClick={cancelInvitation}>Cancel</button>
        </div>)
}

const RequestOut = ({opponent, cancelInvitation, requestAgain, error}) => {
  
  return (
    <div className="invite-form">
      <span className="close-invite-form" onClick={() => cancelInvitation()}><i className="fas fa-times fa-2x"></i></span>
      {
        error? <ShowError error={error} opponent={opponent} requestAgain={requestAgain}/>: <ShowSentRequest opponent={opponent} cancelInvitation={cancelInvitation}/>
      }
</div>
  )

}

export default RequestOut;