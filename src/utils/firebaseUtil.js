import { PlayerContext, UserContext } from 'context/context'
import firebase from 'firebase'
import { useContext } from 'react'
export const initFirebase = () => {
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
    roomStateRef.on('value', (snapshot) => {
      const data = snapshot.val()
      userContext.setRoomState(data)
      if (!data) {
        userContext.reset()
        playerContext.reset()
      } else if (data !== 'waiting') {
        //TODO getGameID
      }
    })
  }

  return {
    addPlayerListener,
    addPlayerListenerSpectator,
    addRoomStateListener,
    closeListener,
  }
}
