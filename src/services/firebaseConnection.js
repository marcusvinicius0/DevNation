import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDe3yJv0cWvaBQGOwik6cq6XsKO14kkle4",
    authDomain: "devsocialnetwork-c3bb1.firebaseapp.com",
    projectId: "devsocialnetwork-c3bb1",
    storageBucket: "devsocialnetwork-c3bb1.appspot.com",
    messagingSenderId: "555977138812",
    appId: "1:555977138812:web:2ca373ff7882c3fe951ff9",
    measurementId: "G-2ZM89W333Z"
  };
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;

//   const app = initializeApp(firebaseConfig);