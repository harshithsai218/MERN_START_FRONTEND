import React,{useContext, useState} from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../Shared/util/validators";
import { useForm } from "../../Shared/hooks/form-hook";
import {AuthContext} from '../../Shared/Context/Auth-context';
import "./Auth.css";


const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLogin, setisLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
  
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
      
      setIsLoading(true);
  
      if (isLogin) {
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
              })
            });
    
            const responseData = await response.json();
            if (!response.ok) {
              throw new Error(responseData.message);
            }
            setIsLoading(false);
            auth.login();
          } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Something went wrong, please try again.');
          }   
        } else {
        try {
          const response = await fetch('http://localhost:5000/api/users/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            })
          });
  
          const responseData = await response.json();
          //console.log(responseData);
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          setIsLoading(false);
          auth.login();
        } catch (err) {
          setIsLoading(false);
          setError(err.message || 'Something went wrong, please try again.');
        }
      }
    };
  
    const errorHandler = () => {
      setError(null);
    };
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler} />
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
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid password, at least 5 characters."
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
  