
const gameSetup = (sender, opponent) => {
  return {
    cells: {
      cell0:"",
      cell1:"",
      cell2:"",
      cell3:"",
      cell4:"",
      cell5:"",
      cell6:"",
      cell7:"",
      cell8:""
    },
    result: {
      winner:"",
      winningLine:"",
      showResult: false
    },
    turn: {
      currentTurn:false,
      lastMove:sender
    },
      score: {
        [sender]: 0,
        [opponent]:0,
        draw: 0
      }
   }
}

const requestDetails = (gameAccessKey, senderId, senderName, recieverId, recieverName, status) => {
  return {     
    gameKey: gameAccessKey,
    senderId: senderId,
    senderName: senderName,                 
    toId: recieverId,
    toName: recieverName,
    status: status     
  }
}
export { gameSetup, requestDetails };