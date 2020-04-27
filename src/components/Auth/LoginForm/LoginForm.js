import React,{useState} from "react";
import {Button,Icon,Form,Input} from "semantic-ui-react";
import {toast} from "react-toastify";
import { validateEmail } from "../../../utils/Validations";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

import "./LoginForm.scss"

export default function LoginForm(props){
  
  const {setSelectedForm} = props;

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState(defaultValueForm);

  const [formError, setFormError] = useState({});

  const [userActive, setUserActive] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(null);

  const onSubmit = () => {

    setFormError({});
    let errors = {};
    let formOk = true;
    console.log('entro al submit');
    console.log('formData: ', formData);

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }

    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }


    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      console.log('email: ',formData.email);
      console.log('password: ',formData.password);
      firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          //sendVerificationEmail();
          //changeUserName();
          console.log('response: ',response);

          setUser(response.user);
          setUserActive(response.user.emailVerified);
          
          if (!userActive){
            toast.warning("Para loguearse hay que veificar la cuenta");
          }

        })
        .catch((err) => {
          handerErrors(err.code);
        })
        .finally(() => {
          setSelectedForm(null);
          setIsLoading(false);
        });
    } else {
      console.log("formError: ", formError);
    }
  }

  const onChange = e => {
    setFormData({
      ...formData, //Esto es un express operator
      [e.target.name]: e.target.value
    });
  }

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="login-form">
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electronico"
            icon="mail outline"
            //onChange
            error={formError.email}
          >
          </Input>
          {formError.email && (
            <span className="error-text">
              Introduzca un correo electronico valido
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            icon={showPassword ? (
              <Icon name="eye slash outline" link onClick={handlerShowPassword} />
            ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )}
          >
          </Input>
          {formError.password && (
            <span className="error-text">
              Introduzca una contrasena valida
            </span>
          )}
        </Form.Field>
        
        <Button type="submit" loading={isLoading}>
          Iniciar Sesion
        </Button>
      </Form>
      
      {!userActive && (
      <ButtonSendVerification
        user={user}
        setIsLoading={setIsLoading}
          setUserActive={setUserActive}      
      />
      )}

      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null) }>Volver</p> 
        <p>
           No tienes cuenta? 
           <span onClick={()=>setSelectedForm("register")}>Registrarse</span>
        </p>               
      </div>
    </div>
  )
};


function ButtonSendVerification(props){
  const {user, setIsLoading,setUserActive} = props;

  const resendVerificationEmail = () => {
    user.sendEmailVerification().then(()=>{
      toast.success("Se ha enviado el mail de verificacion");
    }).catch((err)=>{
      handerErrors(err.code);
    }).finally(()=>{
      setIsLoading(false);
      setUserActive(true);
    });
  } 

  return (
    <div className= "resend-verification-email">
      <p>
        Si no has recibido un mail de verificacion, 
        puedes hacer click <span onClick={resendVerificationEmail}>aqui.</span>
      </p>
    </div>
  )

}

function handerErrors(code){
  switch (code) {
    case "auth/wrong-password":
      toast.warning("El usuario o la contrasena son incorrectas");
      break;
  
    case "auth/too-many-request":
      toast.warning("El usuario ya envio muchas solicitudes");
      break;
    
      case "auth/user-not-found":
      toast.warning("El usuario no existe");
      break;

    default:
      break;
  }
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
    username: ""
  }
}