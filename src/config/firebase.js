import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "nevern0te.firebaseapp.com",
    databaseURL: "https://nevern0te.firebaseio.com",
    projectId: "nevern0te",
    storageBucket: "nevern0te.appspot.com",
    messagingSenderId: "248058225325",
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

export const logOut = () => {
  auth.signOut().then(()=> {
    console.log('logged out')
  }).catch((error) => {
    console.log(error.message)
  })
}
