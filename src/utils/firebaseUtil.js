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

  if (localStorage.getItem('roomCode') !== null) {
    const roomCode = localStorage.getItem('roomCode')
    const userType = localStorage.getItem('userType')
    const userID = localStorage.getItem('userID')
    if (roomCode !== null && userType !== null && userID !== null) {
      if (userType === 'player') {
        const playerRef = firebase
          .database()
          .ref('room/' + roomCode + '/players/' + userID)
        const snapshot = await playerRef.get()
        if (snapshot.exists()) {
          console.log(snapshot.val())
          //TODO set data and add listener
        }
      } else {
        const spectatorRef = firebase
          .database()
          .ref('room/' + roomCode + '/spectator/' + userID)
        const snapshot = await spectatorRef.get()
        if (snapshot.exists()) {
          console.log(snapshot.val())
          //TODO set data and add listener
        }
      }
    }
  }
}
export const useListener = () => {
  const playerContext = useContext(PlayerContext)
  const userContext = useContext(UserContext)

  const closeListener = (roomCode) => {
    const playerRef = firebase.database().ref('room/' + roomCode + '/players')
    const roomStateRef = firebase
      .database()
      .ref('room/' + roomCode + '/roomState')

    playerRef.off()
    roomStateRef.off()
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
        closeListener(roomCode)
        userContext.reset()
        playerContext.reset()
      }
    })
  }

  const addRoomStateListener = (roomCode) => {
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
        console.log(roomCode)
        const gameID = await getGameID(roomCode)
        userContext.setGameID(gameID)
        addGameDataListener(gameID)
      }
    })
  }

  const addGameDataListener = (gameID) => {
    const gameDataRef = firebase.database().ref('game/' + gameID)
    gameDataRef.off()
    gameDataRef.on('value', (snapshot) => {
      const data = snapshot.val()
      console.log(data)
      if (data) userContext.setGameData(data)
    })
  }

  return {
    addPlayerListener,
    addPlayerListenerSpectator,
    addRoomStateListener,
    closeListener,
  }
}
