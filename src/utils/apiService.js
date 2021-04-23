export const getCreateRoom = () => {
  return { roomCode: 'ABCD(RoomCode)' }
}
export const getIsRoomExist = (roomCode) => {
  return true
}
export const postJoinRoom = (roomCode, username, color, type) => {
  // type : 'create'|'join'|'spectate'
  return {
    userID: '0',
  }
}

export const postStartGame = (roomCode) => {
  return {
    gameID: '1212312121',
  }
}

export const getQuestion = (questionID) => {
  // or remove this and send with game data?
  return {
    question: 'When will I get 5 star?',
  }
}

export const getAnswer = (questionID, gameID) => {
  return {
    question: 'When will I get 5 star?', // or call getQuestion again?
    answer: {
      0: 'Never',
      1: 'Never',
    },
  }
}
export const postAnswer = (gameID, userID, questionID) => {}
export const postVote = (gameID, userID, questionID, AnswerUserID) => {}
export const getStanding = (gameID) => {
  return {
    0: 1000,
    1: 100,
  }
}
export const postCountdownEnd = (gameID) => {}
export const postBackToWaiting = (gameID) => {}
