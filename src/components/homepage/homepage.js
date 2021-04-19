import React, {useState, useEffect} from 'react';
import {gameSetup, requestDetails} from './gameSetup';
import Game from '../game/game';
import RequestIn from './requestIn'
import RequestOut from './requestOut';
import Playersboard from './playersBoard';
import database from '../../firebase/config';
import './homepage.css';

const Homepage = ({signOut, user}) => {
  const players = ['Monk', 'Fighter', 'Harami', 'Player1', 'Player2', 'Player3'];
  //================= States Start ===========================//
  const [error,setError] = useState("");
  const [err,setErr] = useState("");
  const [requestOut, setRequestOut] = useState(false);
  const [requestIn, setRequestIn] = useState(false);
  const [playersBoard, setPlayersBoard] = useState(true);
  const [gameBoard, setGameBoard] = useState(false);
  const [opponent, setOpponent] = useState();
  const [gameKey,setGameKey] = useState();
//================= States End ===========================//

//================== Sign-Out Start ========================//
  const handleClick = () => {
    signOut()
  }
//================== Sign-Out End ===========================//

//================== Request Listener Start ====================//
  useEffect(() => {
   database.ref(`users/${user.username}/requestIn`).on('value', (snapshot) => {
     if(snapshot.val() === null){
            setPlayersBoard(true);
            setRequestIn(false)
            setRequestOut(false);
            setOpponent("");
            setGameKey("");
     } else if(snapshot.child('status').val() === "pending") {
            if(snapshot.child('sender').val() === user.username){
               return
            } else {
              let gameKey = snapshot.child('gameKey').val();
              let sender = snapshot.child('sender').val();
              setGameKey(gameKey);
              setOpponent(sender);
              setPlayersBoard(false);
              setRequestIn(true)
            }
            
     } else if(snapshot.child('status').val() === "accept") {
              let gameKey = snapshot.child('gameKey').val();           
              if(snapshot.child('sender').val() !== user.username){
                let sender = snapshot.child('sender').val();
                setGameKey(gameKey);
                setRequestOut(false);
                setOpponent(sender);
                setPlayersBoard(false);
                setGameBoard(true)
            } else {
                let sender = snapshot.child('to').val();
                setGameKey(gameKey);
                setRequestOut(false);
                setOpponent(sender);
                setPlayersBoard(false);
                setGameBoard(true)
            }
     } else if(snapshot.child('status').val() === "decline") {
          let sender = snapshot.child('to').val();
          setError(`${sender} declined!`)
     }
    })
    return () => {(database.ref(`users/${user.username}/requestIn`).off())}
   },[]);

//================== Request Listener End ====================//



//================  Accept/Decline Invitation Start ================//
const playGame = (opponent, gameKey) => {
  let obj = requestDetails(gameKey,  opponent, user.username, "accept");
  let valReturn;
  database.ref(`users/${opponent}/requestIn`).transaction(function(currentData){                   
                  if (currentData && currentData.sender === opponent && currentData.to === user.username){
                    valReturn = true;
                    return obj
                  } else {
                    valReturn = false;
                    if(currentData){
                      return 
                    }
                    return null
                  }}, function(error, committed){
                                if(error) {                          
                                  setErr(error)
                                } else {
                                  if(valReturn) {
                                    setOpponent(opponent);
                                    setGameBoard(true)
                                    database.ref(`users/${user.username}/requestIn`).update(obj);
                                  } else {
                                    setErr(`${opponent} is unavailable!`)
                                  }                               
                                                            
                                }
                    });
 
}

const rejectGame = (opponent, gameKey) => {
  let obj = requestDetails(gameKey, opponent, user.username, "decline");
  database.ref(`users/${opponent}/requestIn`).transaction(function(currentData){
            if (currentData && currentData.sender === opponent && currentData.to === user.username){
              return obj
            } else {             
            return null
            }
            }, function(error, committed, snapshot){
                          if(error) {                          
                            setErr(error)
                          }  else { 
                            database.ref(`users/${user.username}/requestIn`).remove();
                            setRequestIn(false);                                                                                                                                               
                          }
            });

}
//=================  Accept/Decline End ====================//
const requestAgain = (opponent) =>{
  database.ref(`users/${user.username}/requestIn`).remove();
  setError("")
  sendRequest(opponent);
}
//================== Send/Cancel Request(Invite) Start ====================//
const sendRequest = (opponent) => {
      let gameAccessKey = database.ref('Games').push(gameSetup(user.username,opponent)).key;
      let obj = requestDetails(gameAccessKey, user.username, opponent, "pending");
      database.ref(`users/${user.username}/requestIn`).transaction(function(currentData){
                  if (currentData === null){
                    return obj
                  } else {
                    return
                  }
                }, function(error, committed){
                                if(error) {
                                  setRequestOut(true);
                                  setPlayersBoard(false);
                                  setOpponent(opponent)
                                  setError(error);
                                } else if (!committed) {
                                  setRequestOut(true);
                                  setPlayersBoard(false);
                                  setOpponent(opponent);
                                  setError("Something went wrong!!");
                                } else {                                
                                   database.ref(`users/${opponent}/requestIn`).transaction(function(currentData){
                                    if (currentData === null){
                                      return obj
                                    } else {
                                      return
                                    }
                                  }, function(error, committed){
                                       if (error) {
                                        setRequestOut(true);
                                        setPlayersBoard(false);
                                        setError(error);
                                        setOpponent(opponent)
                                       }else if (!committed) {
                                        setRequestOut(true);
                                        setPlayersBoard(false);
                                        setError(`${opponent} is unavailable!`)
                                        setOpponent(opponent);
                                      } else {
                                        setRequestOut(true);
                                        setPlayersBoard(false);
                                        setOpponent(opponent)
                                      }
                                    })
                                  }
                                                            
                                })
          
        }
      
const cancelInvitation = () => {
  database.ref(`users/${user.username}/requestIn`).remove();
  setError("");
  setRequestOut(false);
  setPlayersBoard(true);
  setOpponent()
}

const closeRequestIn = () => {
  database.ref(`users/${user.username}/requestIn`).remove();
  setErr("");
  setRequestIn(false);
  setPlayersBoard(true);
  setOpponent()
}

//================== Stop Playing Start ====================//
  const hideGameBoard = () => {
    database.ref(`users/${user.username}/requestIn`).remove();
    setPlayersBoard(true);
    setGameBoard(false);
    setOpponent()
  }
//================== Stop Playing End ====================//
  
 
  return (
    <div className="homepage">
        <div className="nav">
            <div className="user-part">Hello {user.username}</div>
            <div className="signOut"><button onClick={handleClick}><i class="fas fa-sign-out-alt"></i> Sign Out</button></div>
        </div>
        {requestOut && <RequestOut opponent={opponent} cancelInvitation={cancelInvitation} requestAgain={requestAgain} error={error}/>}
        {requestIn && <RequestIn sender={opponent} playGame={playGame} rejectGame={rejectGame} closeRequestIn={closeRequestIn} gameKey={gameKey} err={err}/>}
        <div className="main-area">
            {playersBoard && <Playersboard players={players} sendRequest={sendRequest}/>}
            {gameBoard && <Game user={user} opponent={opponent} hideGameBoard={hideGameBoard} gameKey={gameKey} /> } 
        </div>
       
    </div>
      )
}

export default Homepage;

