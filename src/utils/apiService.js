import axios from 'axios'

const config = {
  baseURL: process.env.REACT_APP_API_URL,
}
export const apiClient = axios.create(config)

export const getCreateRoom = async () => {
  try {
    const res = await apiClient.get('/room/create')
    console.log(res.data.roomcode)
    return res.data.roomcode
  } catch (err) {
    throw err
  }
}
export const getIsRoomExist = async (roomCode) => {
  try {
    const res = await apiClient.get('/room/check/' + roomCode)
    return res.data.exist
  } catch (err) {
    throw err
  }
}
export const postJoinRoom = async (roomCode, username, color, type) => {
  // type : 'create'|'join'|'spectate'
  try {
    const body = {
      username,
      color: color === -1 ? Math.floor(Math.random() * 8) : color,
      type: type === 'spectate' ? 'spectator' : 'player',
      deviceId: localStorage.getItem('deviceID'),
    }
    const res = await apiClient.post('/room/join/' + roomCode, body)
    return res.data
  } catch (err) {
    throw err
  }
}

export const postStartGame = async (roomCode) => {
  try {
    await apiClient.get('game/start/' + roomCode)
  } catch (err) {
    throw err
  }
}

export const getGameID = async (roomCode) => {
  try {
    const res = await apiClient.get('game/' + roomCode)
    console.log(res.data)
    return res.data.gameId
  } catch (err) {
    throw err
  }
}

export const deleteKickPlayer = async (roomCode, playerID) => {
  const body = { playerId: playerID }
  try {
    await apiClient.delete('/room/kick/' + roomCode, { data: body })
  } catch (err) {
    throw err
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
