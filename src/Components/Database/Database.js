// import firebase from 'firebase'
// import "firebase/firestore"

// var firebaseConfig = {
//       apiKey: "AIzaSyBJoXCHaBG51u5zAt322no2G7LGQiURJEU",
//       authDomain: "rv-book-generation.firebaseapp.com",
//       projectId: "rv-book-generation",
//       storageBucket: "rv-book-generation.appspot.com",
//       messagingSenderId: "1054738028091",
//       appId: "1:1054738028091:web:061d3ae2ffbdaf7e0d2e1e",
//       measurementId: "G-6ZN83JY2MX"
//     };
//   // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();

// export default db;
import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBhf-AOnDKSoCs8E2RXl99dLCiJJgpmo0w",
  authDomain: "fir-eee9d.firebaseapp.com",
  projectId: "fir-eee9d",
  storageBucket: "fir-eee9d.appspot.com",
  messagingSenderId: "531431420409",
  appId: "1:531431420409:web:e09a3d025481ae438f4d28"
};
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default db;
export {firebaseApp};

  