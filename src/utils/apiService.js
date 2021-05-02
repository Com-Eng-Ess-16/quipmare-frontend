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
    const res = await apiClient.get('game/id/' + roomCode)
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

export const getPlayerQuestion = async (gameID, userID) => {
  try {
    const res = await apiClient.get('/game/player/' + gameID + '/' + userID)
    return res.data
  } catch (err) {
    throw err
  }
}

export const getVoteQuestion = async (gameID, questionIndex) => {
  try {
    const res = await apiClient.get(
      '/game/question/' + gameID + '/' + questionIndex
    )
    return res.data
  } catch (err) {
    throw err
  }
}
export const postAnswer = async (gameID, userID, answer, questionOrder) => {
  try {
    const body = {
      playerId: userID,
      answer,
      questionOrder,
    }
    await apiClient.post('/game/answer/' + gameID, body)
  } catch (err) {
    throw err
  }
}
export const postVote = async (gameID, userID, questionIndex, answer) => {
  try {
    const body = {
      playerId: userID,
      answer,
      questionIndex,
    }
    await apiClient.post('/game/vote/' + gameID, body)
  } catch (err) {
    throw err
  }
}
export const getStanding = (gameID) => {
  return {
    0: 1000,
    1: 100,
  }
}
export const postCountdownEnd = async (gameID) => {
  try {
    const res = await apiClient.get('/game/next/' + gameID)
    console.log(res.data)
  } catch (err) {
    throw err
  }
}
export const postBackToWaiting = (gameID) => {}
