import React from 'react';
import Game from '../game/game'
import './homepage.css';



const Homepage = ({signOut, user}) =>{
  
  const handleClick = () => {
    signOut()
  }


  return (
    <div className="homepage">
        <div className="nav">
            <div className="userPart">Welcome {user.username}</div>
            <div className="signOut"><button onClick={handleClick}>Sign Out</button></div>
        </div>
    
    {user.username === 'Monk'? <Game user={user} friendName={"Fighter"} />: <Game user={user} friendName={"Monk"} />}
    
    </div>
      )
}

export default Homepage;