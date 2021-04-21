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

export const addListener = (userID, roomCode, username, userContext) => {
  userContext.setUserID(userID)
  userContext.setUsername(username)
  userContext.setRoomCode(roomCode)
  var ref = firebase
    .database()
    .ref('room/' + roomCode + '/memberList/' + userID + '/gameData')
  ref.off()
  ref.on('value', async (snapshot) => {
    const data = snapshot.val()
    console.log(data)
    userContext.setGameData({ ...data, appState: data.roomState + 1 })
  })
}
