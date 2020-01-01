// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBWlY5KY2q2voCPJ6YA3XAnv67DsMY4lls",
  authDomain: "todo-3bff5.firebaseapp.com",
  databaseURL: "https://todo-3bff5.firebaseio.com",
  projectId: "todo-3bff5",
  storageBucket: "todo-3bff5.appspot.com",
  messagingSenderId: "844320712292",
  appId: "1:844320712292:web:087462a5684b6ce1e52171"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
