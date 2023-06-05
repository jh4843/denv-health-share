import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBJNoQ0IBogFnGZwkTBdrPZUnYp6bKUUi8",
  authDomain: "denv-funcs.firebaseapp.com",
  projectId: "denv-funcs",
  storageBucket: "denv-funcs.appspot.com",
  messagingSenderId: "486675566399",
  appId: "1:486675566399:web:99b410cb3643fee2d44d8a",
};

const firebaseApp = initializeApp(firebaseConfig)

export const firestoreDb = getFirestore(firebaseApp)