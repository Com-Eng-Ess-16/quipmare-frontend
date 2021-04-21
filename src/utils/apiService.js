export const postCreateRoom = (username) => {
  return {
    userID: '0',
    username: 'PKhing',
    roomCode: 'ABCD(RoomCode)',
  }
}
export const postJoinRoom = (username, roomCode) => {
  return {
    userID: '0',
    username: 'PKhing',
    roomCode: 'ABCD(RoomCode)',
  }
}

export const postStartGame = (roomCode) => {}

export const getQuestion = (questionID) => {
  return {
    question: 'When will I get 5 star?',
  }
}

export const getAnswer = (questionID, roomID) => {
  return {
    question: 'When will I get 5 star?', // or call getQuestion again?
    answer: {
      0: 'Never',
      1: 'Never',
    },
  }
}
export const postAnswer = (roomCode, userID, questionID) => {}
export const postVote = (roomCode, userID, questionID, AnswerUserID) => {}
export const getStanding = (roomCode) => {
  return {
    0: 1000,
    1: 100,
  }
}
export const postCountdownEnd = (roomCode) => {}
export const postBackToWaiting = (roomCode) => {}
