import React from "react";

import "./App.css";

import {BrowserRouter, Route , Switch} from 'react-router-dom'
import Signin from "./components/authentification/signin";
import Signup from "./components/authentification/signup";
import Header from "./components/header/header"
import { AuthContext, AuthProvider } from './context/authContext';
import { useContext, useState } from 'react';
import Home from "./pages/home";
import Footer from './components/footer/footer'
function App() {
 const authContext=useContext(AuthContext);
  return (
    <>
   
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path='/'>
           {authContext.auth.email? <Home/> : <Signin/>}
          </Route>
          <Route exact path='/signup'>
            <Signup/>
          </Route>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  );
}


function AppWithStore(){
  return(
     <AuthProvider>
    <App/>
  </AuthProvider>
  )
 
}

export default AppWithStore;
