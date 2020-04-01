import React from 'react';
import firebase from "./utils/Firebase";
import "firebase/auth";

function App() {

  firebase.auth().onAuthStateChanged( currentUser => {
    console.log(currentUser ? 'Ok!' : 'Error');
  });

  return (
    <div>
      <h1>app Electron + React</h1>
    </div>
  );
}

export default App;
