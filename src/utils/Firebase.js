import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCIM4U7tkcXSTkjA_8CDkN13UTT5m7gxCU",
    authDomain: "musicfy-df318.firebaseapp.com",
    databaseURL: "https://musicfy-df318.firebaseio.com",
    projectId: "musicfy-df318",
    storageBucket: "musicfy-df318.appspot.com",
    messagingSenderId: "1018073557722",
    appId: "1:1018073557722:web:361e23f678b755a09493e3"
  };


export default firebase.initializeApp(firebaseConfig);