import React,{useContext, useState} from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../Shared/util/validators";
import { useForm } from "../../Shared/hooks/form-hook";
import {useHttpClients} from "../../Shared/hooks/http-hook";
import {AuthContext} from '../../Shared/Context/Auth-context';
import "./Auth.css";


const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLogin, setisLogin] = useState(true);
    const {isLoading ,error,sendRequest,clearError}=useHttpClients();
  
    const [formState, inputHandler, setFormData] = useForm(
      {
        email: {
          value: '',
          isValid: false
        },
        password: {
          value: '',
          isValid: false
        }
      },
      false
    );
  
    const switchModeHandler = () => {
      if (!isLogin) {
        setFormData(
          {
            ...formState.inputs,
            name: undefined
          },
          formState.inputs.email.isValid && formState.inputs.password.isValid
        );
      } else {
        setFormData(
          {
            ...formState.inputs,
            name: {
              value: '',
              isValid: false
            }
          },
          false
        );
      }
      setisLogin(prevMode => !prevMode);
    };
  
    const authSubmitHandler = async event => {
      event.preventDefault();
    
  
      if (isLogin) {
        try {
             const resposeData=await sendRequest(
              'http://localhost:5000/api/users/login', 
              'POST',
              JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
              }), 
              {
                'Content-Type': 'application/json'
              });
              auth.login(resposeData.user.id);
          }catch(err){

          }
        } else {
        try {
          const resposeData=await sendRequest('http://localhost:5000/api/users/signup',
              'POST',
              JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          auth.login(resposeData.user.id);
        } catch (err) {
        }
      }
    };
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Login Required</h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            {!isLogin && (
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
            )}
            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password, at least 6 characters."
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              {isLogin ? 'LOGIN' : 'SIGNUP'}
            </Button>
          </form>
          <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLogin ? 'SIGNUP' : 'LOGIN'}
          </Button>
        </Card>
      </React.Fragment>
    );
  };
  
  export default Auth;
  