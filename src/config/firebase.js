import firebase from "firebase";
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "nevern0te.firebaseapp.com",
    databaseURL: "https://nevern0te.firebaseio.com",
    projectId: "nevern0te",
    storageBucket: "nevern0te.appspot.com",
    messagingSenderId: "248058225325",
    appId: process.env.FIREBASE_APP_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase
