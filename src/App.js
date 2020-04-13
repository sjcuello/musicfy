import React,{useState} from 'react';
import firebase from "./utils/Firebase";
import "firebase/auth";
import Auth from "./pages/Auth";

function App() {

  const [user, setUser] = useState(null);

  const [isloading, setIsLoading] = useState(true);
 
  firebase.auth().onAuthStateChanged( currentUser => {
    //console.log(currentUser);
    if (!currentUser){
      setUser(null);
    }else{
      setUser(currentUser);
    }
    setIsLoading(false);  // Porque acabo de cargar
  });

  if (isloading) {
    return null;
  }

  return !user ? <Auth/> : <UserLogged/>;

}


//Componente para un usuario logueado
function UserLogged() {

  const logout = () =>{
    firebase.auth.signOut();
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems:"center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh"
      }}
    >
      <h1>Usuario Logueado</h1>
      <button onClick={logout}> Cerrar sesion </button>
    </div>
  );
}


export default App;
