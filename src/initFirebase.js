import firebase from 'firebase'
function initFirebase() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    projectId: 'quipmare-game',
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    var testRef = firebase.database().ref('test')
    testRef.off()
    testRef.on('value', (snapshot) => {
      const data = snapshot.val()
      console.log('here')
      console.log(data)
    })
  }
}
export default initFirebase
