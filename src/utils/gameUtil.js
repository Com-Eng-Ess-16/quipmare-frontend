import { UserContext } from 'context/context'
import firebase from 'firebase'
import { useContext } from 'react'
import { useListener } from './firebaseUtil'
export const useGameUtil = () => {
  const userContext = useContext(UserContext)
  const listener = useListener()
  const rejoin = async () => {
    if (
      localStorage.getItem('roomCode') !== null &&
      userContext.roomCode === null
    ) {
      const roomCode = localStorage.getItem('roomCode')
      const userType = localStorage.getItem('userType')
      const userID = localStorage.getItem('userID')
      const deviceID = localStorage.getItem('deviceID')
      if (roomCode !== null && userType !== null && userID !== null) {
        if (userType === 'player') {
          const playerRef = firebase
            .database()
            .ref('room/' + roomCode + '/players/' + userID)
          const snapshot = await playerRef.get()
          if (snapshot.exists()) {
            if (snapshot.val().deviceId === deviceID) {
              console.log('rejoin')
              userContext.setRoomCode(roomCode)
              userContext.setUserType(userType)
              userContext.setUserID(userID)
              userContext.setUsername(snapshot.val().username)
              listener.addPlayerListener(roomCode, userID)
              listener.addRoomStateListener(roomCode)
            }
          }
        } else {
          const spectatorRef = firebase
            .database()
            .ref('room/' + roomCode + '/spectator/' + userID)
          const snapshot = await spectatorRef.get()
          if (snapshot.exists()) {
            if (snapshot.val() === deviceID) {
              console.log('rejoin')
              userContext.setRoomCode(roomCode)
              userContext.setUserType(userType)
              userContext.setUserID(userID)
              userContext.setUsername(snapshot.val().username)
              listener.addPlayerListenerSpectator(roomCode)
              listener.addRoomStateListener(roomCode)
            }
          }
        }
      } else {
        clearStorage()
      }
    }
  }
  const clearStorage = () => {
    const deviceID = localStorage.getItem('deviceID')
    localStorage.clear()
    localStorage.setItem('deviceID', deviceID)
  }

  const clearGameData = () => {
    localStorage.removeItem('questionIndex')
    localStorage.removeItem('vote')
    localStorage.removeItem('index')
  }

  return { rejoin, clearStorage, clearGameData }
}
