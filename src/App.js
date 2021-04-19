import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import JokeSpot from './components/JokeSpot';
import TaskForm from './components/TaskForm';
import {PrivateRoute} from './Routes/PrivateRoute';
import {getToken} from './constant/Common';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

function App() {  
    
  return (
    <>      
    <Router>  
        <Header />      
        <Switch>            
        <Route path='/login' exact render ={()=> getToken() == null ?(<Login />):(<Redirect to ='/dash' />) } />
        <Route exact path="/">
              <Redirect to="/login" />
        </Route>    
        <PrivateRoute exact path="/dash" component={Dashboard} />  
        <PrivateRoute exact path="/jokespot" component={JokeSpot} />  
        <PrivateRoute exact path="/add" component={TaskForm} />  
        <PrivateRoute exact path="/edit/:id" component={TaskForm} />
        </Switch>        
      </Router>    
    </>
  );
}

export default App;

