import React, {useState, useEffect} from 'react';
import {gameSetup, requestDetails} from './gameSetup';
import Game from '../game/game';
import RequestIn from './requestIn'
import RequestOut from './requestOut';
import Playersboard from './playersBoard';
import {database} from '../../firebase/config';
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
//================= States End ===========================//

//================== Sign-Out Start ========================//
  const handleClick = () => {
    signOut(userId);
  }
//================== Sign-Out End ===========================//

useEffect(() => {
    function playerInfo(userID,username){
      return {
        userId: userID,
        username: username
      }
    }
    let ref = database.ref("users");
    ref.on('value', (snapshot) => {
           let arr = [];
           snapshot.forEach(function(childSnapshot){             
                if(childSnapshot.key === userId){
                   setUsername(childSnapshot.val().username)
                } else{
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
     function opponentInfo(Id,username) {
        return {
          userId: Id,
          username: username
        }
     }
     if(snapshot.val() === null){
            setPlayersBoard(true);
            setRequestIn(false)
            setRequestOut(false);
            setOpponent("");
            setGameKey("");
     } else if(snapshot.child('status').val() === "pending") {
            if(snapshot.child('senderId').val() === userId){
               return
            } else {
              let gameKey = snapshot.child('gameKey').val();
              let senderName = snapshot.child('senderName').val();
              let senderId = snapshot.child('senderId').val();
              let opponentData = opponentInfo(senderId,senderName)             
              setGameKey(gameKey);
              setOpponent(opponentData)     
              setPlayersBoard(false);
              setRequestIn(true)
            }
            
     } else if(snapshot.child('status').val() === "accept") {
              let gameKey = snapshot.child('gameKey').val();     
              if(snapshot.child('senderId').val() !== userId){
                let senderName = snapshot.child('senderName').val();
                let senderId = snapshot.child('senderId').val();
                let opponentData = opponentInfo(senderId,senderName);
                setGameKey(gameKey);
                setRequestOut(false);               
                setOpponent(opponentData)
                setRequestIn(false);
                setPlayersBoard(false);
                setGameBoard(true)
            } else {          
                let senderName = snapshot.child('toName').val();
                let senderId = snapshot.child('toId').val();
                let opponentData = opponentInfo(senderId,senderName);
                setGameKey(gameKey);
                setRequestOut(false);
                setOpponent(opponentData)
                setPlayersBoard(false);
                setGameBoard(true)
            }
     } else if(snapshot.child('status').val() === "decline") {
          let sender = snapshot.child('toName').val();
          setError(`${sender} declined!`)
     }
    })
    return () => {(database.ref(`users/${userId}/requestIn`).off())}
   },[userId]);

//================== Request Listener End ====================//



//================  Accept/Decline Invitation Start ================//
const playGame = (opponent, gameKey) => {
  let obj = requestDetails(gameKey, opponent.userId, opponent.username, userId, username, "accept");  
  let valReturn; 
    database.ref(`users/${opponent.userId}/requestIn`).transaction(function(currentData){               
                  if (currentData && currentData.senderId === opponent.userId && currentData.toId === userId){
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
    database.ref(`users/${opponent.userId}/requestIn`).transaction(function(currentData){
            if (currentData && currentData.senderId === opponent.userId && currentData.toId === userId){
              return obj
            } else {             
            return null
            }
            }, function(error, committed, snapshot){
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
          database.ref(`users/${userId}/requestIn`).transaction(function(currentData){
                  if (currentData === null){
                    return obj
                  } else {
                    return
                  }
                }, function(error, committed){
                                if(error) {
                                    setOpponent(opponent);
                                    setRequestOut(true);
                                    setPlayersBoard(false);                                   
                                    setError(error);
                                } else if (!committed) {
                                    setOpponent(opponent);
                                    setRequestOut(true);
                                    setPlayersBoard(false);                                   
                                    setError("Something went wrong!!");
                                } else {                                                                
                                    database.ref(`users/${opponent.userId}/requestIn`).transaction(function(currentData){
                                    if (currentData === null){
                                      return obj
                                    } else {
                                      return
                                    }
                                  }, function(error, committed){
                                       if (error) {
                                        setOpponent(opponent)
                                        setRequestOut(true);
                                        setPlayersBoard(false);
                                        setError(error);                                       
                                       }else if (!committed) {
                                        setOpponent(opponent);
                                        setRequestOut(true);
                                        setPlayersBoard(false);
                                        setError(`${opponent.username} is unavailable!`)                                                                              
                                      } else {
                                        setOpponent(opponent)
                                        setRequestOut(true);
                                        setPlayersBoard(false);                                       
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
                        />}
        {requestIn && <RequestIn 
                            sender={opponent} 
                            playGame={playGame} 
                            rejectGame={rejectGame} 
                            closeRequestIn={closeRequestIn} 
                            gameKey={gameKey} 
                            err={err}
                        />}
        <div className="main-area">
            {playersBoard && <Playersboard 
                                  players={players} 
                                  sendRequest={sendRequest}
                              />}
            
            {gameBoard && <Game 
                                user={username} 
                                opponent={opponent.username} 
                                hideGameBoard={hideGameBoard} 
                                gameKey={gameKey} 
                           />} 
        </div>
       
    </div>
      )
}

export default Homepage;

