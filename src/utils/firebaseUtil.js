import { PlayerContext, UserContext } from 'context/context'
import firebase from 'firebase'
import { useContext } from 'react'
import { getGameID } from './apiService'
import { randomString } from './randomUtil'
export const initFirebase = async () => {
  if (localStorage.getItem('deviceID') === null) {
    localStorage.setItem('deviceID', randomString(10))
  }

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    projectId: 'quipmare-game',
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
}
export const useListener = () => {
  const playerContext = useContext(PlayerContext)
  const userContext = useContext(UserContext)

  const closeListener = (roomCode, gameID, userID) => {
    const playerRef = firebase.database().ref('room/' + roomCode + '/players')
    const roomStateRef = firebase
      .database()
      .ref('room/' + roomCode + '/roomState')

    playerRef.off()
    roomStateRef.off()
    if (gameID) {
      closeGameDataListener(gameID, userID)
    }
  }
  const closeGameDataListener = (gameID, userID) => {
    const gameStateRef = firebase
      .database()
      .ref('game/' + gameID + '/gameState')
    gameStateRef.off()
    const countdownRef = firebase
      .database()
      .ref('game/' + gameID + '/deadlineTime')
    countdownRef.off()
    if (userID !== null && userID !== undefined) {
      const scoreRef = firebase
        .database()
        .ref('game/' + gameID + '/players/' + userID + '/point')
      scoreRef.off()
    }
  }

  const addPlayerListenerSpectator = (roomCode) => {
    const playerRef = firebase.database().ref('room/' + roomCode + '/players')
    playerRef.off()
    playerRef.on('value', (snapshot) => {
      const data = snapshot.val()
      if (data) playerContext.setPlayer(data)
      else playerContext.setPlayer({})
    })
  }

  const addPlayerListener = (roomCode, userID) => {
    const playerRef = firebase.database().ref('room/' + roomCode + '/players')
    playerRef.off()
    playerRef.on('value', (snapshot) => {
      const data = snapshot.val()
      if (data) playerContext.setPlayer(data)
      else playerContext.setPlayer({})
      let isInRoom = false
      for (let playerID in data) {
        if (playerID === String(userID)) isInRoom = true
      }

      if (!isInRoom) {
        closeListener(roomCode, null, userID)
        userContext.reset()
        playerContext.reset()
      }
    })
  }

  const addRoomStateListener = (roomCode, userID) => {
    const roomStateRef = firebase
      .database()
      .ref('room/' + roomCode + '/roomState')
    roomStateRef.off()
    roomStateRef.on('value', async (snapshot) => {
      const data = snapshot.val()
      userContext.setRoomState(data)
      if (!data) {
        userContext.reset()
        playerContext.reset()
      } else if (data !== 'waiting') {
        const gameID = await getGameID(roomCode)
        userContext.setGameID(gameID)
        addGameStateListener(gameID)
        addCountdownEndListener(gameID)
        if (userID !== null && userID !== undefined) {
          addScoreListener(gameID, userID)
        }
      }
    })
  }

  const addGameStateListener = (gameID) => {
    const gameStateRef = firebase
      .database()
      .ref('game/' + gameID + '/gameState')
    gameStateRef.off()
    gameStateRef.on('value', (snapshot) => {
      const data = snapshot.val()
      if (data) userContext.setGameState(data)
    })
  }

  const addScoreListener = (gameID, userID) => {
    const scoreRef = firebase
      .database()
      .ref('game/' + gameID + '/players/' + userID + '/point')
    scoreRef.off()
    scoreRef.on('value', (snapshot) => {
      const data = snapshot.val()
      if (data) userContext.setScore(data)
    })
  }

  const addCountdownEndListener = (gameID) => {
    const countdownRef = firebase
      .database()
      .ref('game/' + gameID + '/deadlineTime')
    countdownRef.off()
    countdownRef.on('value', (snapshot) => {
      const data = snapshot.val()
      if (data) userContext.setCountdownEnd(data)
    })
  }

  return {
    addPlayerListener,
    addPlayerListenerSpectator,
    addRoomStateListener,
    closeListener,
    closeGameDataListener,
  }
}
