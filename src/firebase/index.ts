import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAq9cLyRBzirMoDwwh14BUXs18bQkd97_o",
    authDomain: "scc-class-reservation.firebaseapp.com",
    databaseURL: "https://scc-class-reservation.firebaseio.com",
    projectId: "scc-class-reservation",
    storageBucket: "scc-class-reservation.appspot.com",
    messagingSenderId: "1035151001981",
    appId: "1:1035151001981:web:422cfdac70a14dc34f2414",
    measurementId: "G-WBDQZ2LZ0G"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();