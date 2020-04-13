import React,{useState} from "react";
import {Button, Icon, Form, Imput, Input} from "semantic-ui-react";
import firebase  from "../../../utils/Firebase";
import {validateEmail}  from "../../../utils/Validations";
import "firebase/auth";

import "./RegisterForm.scss";


export default function RegisterForm(props) {

  const {setSelectedForm} = props;

  const [formData, setFormData] = useState(defaultValueForm);

  const [showPassword, setShowPassword] = useState(false);

  const [formError, setFormError] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;
    console.log('entro al submit');
    console.log('formData: ', formData);

    if (!validateEmail(formData.email)){
      errors.email = true;
      formOk = false;
    }

    if (formData.password.length < 6){
      errors.password = true;
      formOk = false;
    }

    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }

    setFormError(errors);
    
    if(formOk){
      setIsLoading(true);
      firebase.auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log("Registro completado")
        })
        .catch(() => {
          console.log("Error al registrar")
        })
        .finally(() => {
          setSelectedForm(null);
          setIsLoading(false);
        });
    } else{
      console.log("formError: ", formError );
    }
  }

  const onChange = e =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  }


  return (
    <div className="register-form">
      <h1> Empieza a escuchar musica con una cuenta gratis</h1>
      <Form onSubmit= {onSubmit} onChange= {onChange}>
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
            type={showPassword ? "text" : "password" }
            name = "password"
            placeholder="Password"
            icon={showPassword ? (
              <Icon name="eye slash outline" link onClick={handlerShowPassword} /> 
              ) :(
              <Icon name="eye" link onClick={handlerShowPassword} /> 
              )}
            error={formError.password}
          >
          </Input>
          {formError.password && (
            <span className="error-text">
              Introduzca una contrasena de mas de 5 caracteres
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name = "username"
            placeholder="Nombre"
            icon="user circle outline"
            error={formError.username}
          >
          </Input>
          {formError.username && (
            <span className="error-text">
              Introduzca un username
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading= {isLoading}>
          Continuar
        </Button>
      </Form>
      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p onClick={() => setSelectedForm("login")}>
          Ya estas registrado? <span>Iniciar sesion</span>
        </p>
      </div>
    </div>
  )
};

function defaultValueForm(){
  return {
    email: "",
    password: "",
    username: ""
  }
}