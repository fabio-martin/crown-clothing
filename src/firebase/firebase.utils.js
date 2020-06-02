import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDWNwBFmiAa5DSasdgO-A-oV8dEPVidOzw",
    authDomain: "crwn-db-e601c.firebaseapp.com",
    databaseURL: "https://crwn-db-e601c.firebaseio.com",
    projectId: "crwn-db-e601c",
    storageBucket: "crwn-db-e601c.appspot.com",
    messagingSenderId: "593632325962",
    appId: "1:593632325962:web:8c6d07410664d028b891b3",
    measurementId: "G-D5ZW4946VG"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => { 

  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      }) 
    } catch ( error) {
      console.log('error creating user', error.message)
    }

  }
  return userRef
} 

firebase.initializeApp(config);


export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;