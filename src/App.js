import React,{useCallback,useState} from 'react';
import {BrowserRouter as Router ,Route, Redirect,Switch} from "react-router-dom";

import Users from './Users/Pages/Users';
import NewPlaces from './Places/Pages/NewPlaces';
import UserPlaces from './Places/Pages/UserPlaces';
import UpdatePlace from './Places/Pages/UpdatePlaces';
import Auth from './Users/Pages/Auth';
import MainNavigation from './Shared/Components/Navigation/MainNavigation';
import { AuthContext } from './Shared/Context/Auth-context';
const App = () =>{
    const[isLoggedIn,setIsLoggedIn]=useState(false);
    const[userId,setUserId]=useState(false);

    const login=useCallback((uid)=>{
      setIsLoggedIn(true);
      setUserId(uid);
    },[]);
    const logout=useCallback(()=>{
      setIsLoggedIn(false);
      setUserId(null);
    },[]);

    let routes;
    if(isLoggedIn){
      routes=(
        <Switch>
          <Route path="/" exact>
            <Users/> 
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces/>
          </Route> 
          <Route path="/places/new" exact>
            <NewPlaces/> 
          </Route>;
          <Route path="/places/:placeId">
            <UpdatePlace/>
           </Route>
          <Redirect to="/"/> 
      </Switch>
      );
    }
    else{
      routes=(
        <Switch>
          <Route path="/" exact>
            <Users/> 
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces/>
          </Route> 
          <Route path="/auth">
            <Auth/>
          </Route>
          <Redirect to="/auth"/> 
        </Switch>
      );
    }


    return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn,userId:userId,login: login,logout: logout}}>
    <Router>
      <MainNavigation/> 
      <main>
        {routes}
      </main>
    </Router>
    </AuthContext.Provider>
    );
}; 

export default App;
