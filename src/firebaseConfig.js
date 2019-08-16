import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import firestore from 'firebase/firestore'
// import auto from 'firebase/auth'

// firebase init goes here
const config = {
  apiKey: '',
  authDomain: 'linker-c26d5.firebaseapp.com',
  databaseURL: 'https://linker-c26d5.firebaseio.com',
  projectId: 'linker-c26d5',
  storageBucket: 'linker-c26d5.appspot.com',
  messagingSenderId: ''
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
// console.log(auth)
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const chatsCollection = db.collection('chats')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

// for testing
// const test = db.collection('users').doc('Z21OCoCK2zf3D6dwAQYXDTKpC6M2')
// test
//   .get()
//   .then(function (doc) {
//     if (doc.exists) {
//       console.log('Document data:', doc.data())
//     } else {
//       // doc.data() will be undefined in this case
//       console.log('No such document!')
//     }
//   })
//   .catch(function (error) {
//     console.log('Error getting document:', error)
//   })

export default {
  db,
  auth,
  currentUser,
  usersCollection,
  chatsCollection
  //   commentsCollection,
  //   likesCollection
}
