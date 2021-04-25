import firebase from 'firebase'
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

export const addPlayerListener = async (roomCode, playerContext) => {
  const playerRef = firebase.database().ref('room/' + roomCode + '/playerList')
  playerRef.off()
  playerRef.on('value', (snapshot) => {
    const data = snapshot.val()
    playerContext.setPlayer(data)
  })
}
export const addListener = async (userID, roomCode, userContext) => {
  const ref = firebase
    .database()
    .ref('room/' + roomCode + '/gameData/' + userID)
  ref.off()
  ref.on('value', (snapshot) => {
    const data = snapshot.val()
    userContext.setGameData({ ...data, appState: data.roomState + 1 })
  })
}
