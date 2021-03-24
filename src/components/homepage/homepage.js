import React, {useState} from 'react';
import Game from '../game/game'
import './homepage.css';

const ResultBoard = ({winner,resetGameBoard}) => {
  return( <div className="resultBoard">
                    <div className="results">{winner} wins</div>
                    <button onClick={() => resetGameBoard()}>Play Again</button>
                    <button>Close Game</button>
          </div>)
}

//============== Game Invitation Dialog Box
const GameInvitation = ({friend, inviteFriend}) => {
  const handleClick = () => {
    inviteFriend();
  }
  return (
    <div className="inviteForGame">
        Invite {friend} for a Game!!
     <button onClick={handleClick}>INVITE</button>
</div>
  )

}
const Homepage = ({signOut, user}) =>{
  
  const [inviteFriendForGame, setInviteFriendForGame] = useState("");
  const [showInvitationBox, setShowInvitationBox] = useState(false)
  const [showGameBoard, setshowGameBoard] = useState(false);

  const handleClickFriend = (friendName) => {
    setShowInvitationBox(true);
    setInviteFriendForGame(friendName);
  }

  const handleClick = () => {
    signOut()
  }

  const inviteFriend = () => {
    setShowInvitationBox(false);
    setshowGameBoard(true);
  }

  return (
    <div className="homepage">
       <div className="nav">
           <div className="userPart">Welcome {user.username}</div>
           <div className="signOut"><button onClick={handleClick}>Sign Out</button></div>
       </div>
       <div className="friends">
         <div className="heading-line"></div>
         <ul className="friend-list">  
           {user.friends.map((friend,index) => 
                                                   <li key={index} onClick={() => handleClickFriend(friend)}>
                                                    {friend} 
                                                    <span className="online-circle"></span>
                                                    </li>)}
         </ul>
         {showInvitationBox && <GameInvitation friend={inviteFriendForGame} inviteFriend={inviteFriend} />}
       </div>
       {showGameBoard && <Game friendName={inviteFriendForGame} />}
    </div>
  )
}

export default Homepage;