const firebase  = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyBGYqWP_xSj2nSeBtCoTLfg4Ijg0ultfPw",
  authDomain: "typefinder-347bd.firebaseapp.com",
  projectId: "typefinder-347bd",
  storageBucket: "typefinder-347bd.appspot.com",
  messagingSenderId: "131600279075",
  appId: "1:131600279075:web:d103ba62dcdb6663847396",
  measurementId: "G-PEEX2X2SPL"
};
firebase.initializeApp(firebaseConfig);
const db  = firebase.firestore();
const User = db.collection('Users');
module.exports = User;