import axios from 'axios'

const config = {
  baseURL: process.env.REACT_APP_API_URL,
}
export const apiClient = axios.create(config)

export const getCreateRoom = async () => {
  try {
    const res = await apiClient.get('/room/create')
    console.log(res.data)
    return res.data
  } catch (err) {
    //handle error
  }
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

export const getStartGame = async (roomCode) => {
  try {
    const res = await apiClient.get('/start/' + roomCode)
    console.log(res.gameID)
  } catch (err) {
    //handle error
  }
}

export const getQuestion = async (questionID) => {
  try {
    const res = await apiClient.get('/question/' + questionID)
    return res.data
  } catch (err) {
    //handle error
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
