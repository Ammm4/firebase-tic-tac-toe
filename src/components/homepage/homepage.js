import React, { useState, useEffect } from 'react';
import { gameSetup, requestDetails } from './gameSetup';
import Game from '../game/game';
import RequestIn from './requestIn'
import RequestOut from './requestOut';
import Playersboard from './playersBoard';
import { database } from '../../firebase/config';
import { useHistory } from 'react-router-dom';
import './homepage.css';


const Homepage = ({signOut, userId}) => {
  
  //================= States Start ===========================//
  const [username, setUsername] = useState("");
  const [players, setPlayers] = useState([]);
  const [error,setError] = useState("");
  const [err,setErr] = useState("");
  const [requestOut, setRequestOut] = useState(false);
  const [requestIn, setRequestIn] = useState(false);
  const [playersBoard, setPlayersBoard] = useState(true);
  const [gameBoard, setGameBoard] = useState(false);
  const [opponent, setOpponent] = useState();
  const [gameKey,setGameKey] = useState();
  const history = useHistory();
//================= States End ===========================//

//================== Sign-Out Start ========================//
  const handleClick = () => {
    signOut(userId);
    history.push('/login');
  }
//================== Sign-Out End ===========================//
function playerInfo(userID,username) {
  return {
    userId: userID,
    username: username
  }
}

useEffect(() => {  
  let ref = database.ref("users");
  ref.on('value', (snapshot) => {
    let arr = [];
    snapshot.forEach( function(childSnapshot) {             
      if (childSnapshot.key === userId) {
        setUsername(childSnapshot.val().username)
      } else {
        let data = playerInfo(childSnapshot.key, childSnapshot.val().username);
        arr.push(data)
      }              
    })
    setPlayers(arr);
  })
  return (() => ref.off())
}, [userId]);

//================== Request Listener Start ====================//
  useEffect(() => {
    database.ref(`users/${userId}/requestIn`).on('value', (snapshot) => {   
      if(snapshot.val() === null) {
        setPlayersBoard(true);
        setRequestIn(false)
        setRequestOut(false);
        setOpponent("");
        setGameKey("");          
     } else {
       let gameKey = snapshot.child('gameKey').val();
       let senderName = snapshot.child('senderName').val();
       let senderId = snapshot.child('senderId').val();
       let toName = snapshot.child('toName').val();
       let toId = snapshot.child('toId').val(); 
       let status = snapshot.child('status').val();
       setGameKey(gameKey)
         if (status === "pending") {
           if(senderId === userId) {
             return
           } else {
             let opponentData = playerInfo(senderId,senderName)             
             setOpponent(opponentData)     
             setPlayersBoard(false);
             setRequestIn(true);
           }
         } else if (status === "accept") {
           let opponentData = senderId !== userId ? playerInfo(senderId,senderName): playerInfo(toId,toName);                   
           setRequestIn(false);
           setRequestOut(false);                                                      
           setOpponent(opponentData)
           setPlayersBoard(false);
           setGameBoard(true);
         } else {
           setGameKey();
           setError(`${toName} declined!`)
         }
     }
     return () => { (database.ref(`users/${userId}/requestIn`).off()) }
    })       
   }, [userId]);

//================== Request Listener End ====================//



//================  Accept/Decline Invitation Start ================//
const playGame = (opponent, gameKey) => {
  let obj = requestDetails(gameKey, opponent.userId, opponent.username, userId, username, "accept");  
  let valReturn; 
  database.ref(`users/${opponent.userId}/requestIn`).transaction( function(currentData) {               
    if (currentData && currentData.senderId === opponent.userId && currentData.toId === userId) {
      valReturn = true;
      return obj
      } else {
        valReturn = false;
        if (currentData) {
          return 
        }
          return null
        }}, function(error, committed){
              if(error) {                          
                setErr(error)
              } else {
                if(valReturn) {
                  setOpponent(opponent);
                  setGameBoard(true);
                  database.ref(`users/${userId}/requestIn`).update(obj);
                } else {
                  setErr(`${opponent.username} is unavailable!`)
                }                                                                                        
              }
        });
}

const rejectGame = (opponent, gameKey) => {
  let obj = requestDetails(gameKey, opponent.userId, opponent.username, userId, username, "decline");
  database.ref(`users/${opponent.userId}/requestIn`).transaction(function(currentData) {
    if (currentData && currentData.senderId === opponent.userId && currentData.toId === userId) {
      return obj
    } else {             
      return null
    }}, function(error, committed, snapshot){
      if(error) {                          
        setErr(error)
      }  else {
        database.ref(`users/${userId}/requestIn`).remove();                            
        setRequestIn(false);                                                                                                                                               
      }
    });
}
//=================  Accept/Decline End ====================//
const requestAgain = (opponent) =>{
  database.ref(`users/${userId}/requestIn`).remove();
  setError("");
  sendRequest(opponent);
}
//================== Send/Cancel Request(Invite) Start ====================//
const sendRequest = (opponent) => {
  let gameAccessKey = database.ref('Games').push(gameSetup(username,opponent.username)).key;
  let obj = requestDetails(gameAccessKey, userId, username, opponent.userId, opponent.username, "pending");
  database.ref(`users/${userId}/requestIn`).transaction(function(currentData) {
    if (currentData === null) {
      return obj
    } else {
      return
    }}, function(error, committed) {              
          setOpponent(opponent);
          setRequestOut(true);
          setPlayersBoard(false);                    
          if(error) {                                  
            setError(error);
          } else if (!committed) {                                  
            setError("Something went wrong!!");
          } else {                                                                
            database.ref(`users/${opponent.userId}/requestIn`).transaction(function(currentData) {
              if (currentData === null) {
                return obj
              } else {
                return
              }
            }, function(error, committed) {
                 if (error) {
                   setError(error);                                       
                 } else if (!committed) {
                   setError(`${opponent.username} is unavailable!`)                                                                              
                 } 
            })
          }
                                                            
    })        
}
      
const cancelInvitation = () => {
  database.ref(`users/${userId}/requestIn`).remove();
  setError("");
  setOpponent();
  setRequestOut(false);
  setPlayersBoard(true); 
}

const closeRequestIn = () => {
  database.ref(`users/${userId}/requestIn`).remove();
  setErr("");
  setOpponent()
  setRequestIn(false);
  setPlayersBoard(true); 
}

//================== Stop Playing Start ====================//
  const hideGameBoard = () => {
    database.ref(`users/${userId}/requestIn`).remove();
    setOpponent()
    setPlayersBoard(true);
    setGameBoard(false);  
  }
//================== Stop Playing End ====================//
  
  return (
    <div className="homepage">
      <div className="nav">
        <div className="user-part">Hello {username}</div>
        <div className="signOut">
          <button onClick={handleClick}>
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      </div>
      {requestOut && <RequestOut 
                       opponent={opponent} 
                       cancelInvitation={cancelInvitation} 
                       requestAgain={requestAgain} 
                       error={error}
                      />
      }
      {requestIn && <RequestIn 
                      sender={opponent} 
                      playGame={playGame} 
                      rejectGame={rejectGame} 
                      closeRequestIn={closeRequestIn} 
                      gameKey={gameKey} 
                      err={err}
                      />
      }
      <div className="main-area">
        {playersBoard && <Playersboard 
                           players={players} 
                           sendRequest={sendRequest}
                         />
        }
        {gameBoard && <Game 
                      user={username} 
                      opponent={opponent.username} 
                      hideGameBoard={hideGameBoard} 
                      gameKey={gameKey} 
                      />
        } 
      </div>     
  </div>
  )
}

export default Homepage;

