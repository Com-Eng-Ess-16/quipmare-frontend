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

export const addListener = async (
  userID,
  roomCode,
  username,
  userContext,
  memberContext
) => {
  userContext.setUserID(userID)
  userContext.setUsername(username)
  userContext.setRoomCode(roomCode)
  const ref = firebase
    .database()
    .ref('room/' + roomCode + '/gameData/' + userID)
  ref.off()
  ref.on('value', (snapshot) => {
    const data = snapshot.val()
    console.log(data)
    userContext.setGameData({ ...data, appState: data.roomState + 1 })
  })

  const memberRef = firebase.database().ref('room/' + roomCode + '/memberList')
  memberRef.off()
  memberRef.on('value', (snapshot) => {
    const data = snapshot.val()
    console.log(data)
    memberContext.setMember(data)
  })
}
