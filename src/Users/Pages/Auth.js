import React,{useContext, useState} from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import { VALIDATOR_EMAIL,VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../Shared/util/validators";
import { useForm } from "../../Shared/hooks/form-hook";
import {AuthContext} from '../../Shared/Context/Auth-context';
import "./Auth.css";

const Auth =()=>{
    const auth=useContext(AuthContext);
    const [isLogin,setIsLogin]=useState(true);
const [formState,inputHandler,setFormData]=useForm({
    email:{
        value:'',
        isValid:false
    },
    password:{
        value:'',
        isValid:false
    }

},false);

const authSubmitHandler = event=>{
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
};

const switchModeHandler = ()=>{
    if(!isLogin){
        setFormData({
            ...formState.inputs, 
            name:undefined
        } ,formState.inputs.email.isValid&&formState.inputs.password.isValid);
    }
    else{
        setFormData({
            ...formState.inputs,
            name:{
                value:'',
                isValid:false
            }
        },false
    );
    }
    setIsLogin(prevMode => !prevMode)
};

    return (
    <Card className="authentication"> 
        <h2>Login Required</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
            {!isLogin && <Input 
            element = "input"
            id="name" 
            type="text" 
            label="Name" 
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name"
            onInput={inputHandler}
            />}
            <Input 
            element = "input"
            id="email" 
            type="email" 
            label="E-Mail" 
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput={inputHandler}
            />
            <Input 
            element = "input"
            id="password" 
            type="password" 
            label="Password" 
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter minimum 6 characters"
            onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>{isLogin ?'LOGIN' :'SIGN UP'}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLogin?'SIGN UP':'LOGIN'}</Button>
    </Card>
    );
};

export default Auth;