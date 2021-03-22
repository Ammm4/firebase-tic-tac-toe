import React, {useState} from 'react';
import './homepage.css';

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

  const [inviteForGame, setinviteForGame] = useState("");

  const handleClickFriend = (friend) => {
    setinviteForGame(friend);
  }

  const handleClick = () => {
    signOut()
  }

  const inviteFriend = () => {
    setinviteForGame("")
  }

  return (
    <div className="homepage">
       <div className="nav">
           <div className="userPart">Welcome Amit</div>
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
         { inviteForGame && <GameInvitation friend={inviteForGame} inviteFriend={inviteFriend} />}
       </div>
       
    </div>
  )
}

export default Homepage;