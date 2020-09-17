import React, { createContext, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Booking from './Components/Booking/Booking';
import Hotels from './Components/Hotels/Hotels';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Auth from './Components/Auth/Auth';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import News from './Components/News/News'
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import Destination from './Components/Destination/Destination';
export const MyContext=createContext()
firebase.initializeApp(firebaseConfig);
function App() {

  const [showArea,setShowArea]=useState(
    {
      id:1,
      title:"Cox's Bazar",
      description:"Cox's Bazar is the longest see beach is the world.Cox's Bazar is a district in the Chittagong Division of Bangladesh. It is named after Cox's Bazar town. It is located 150 kilometres (93 mi) south of Chittagong.",
      img:"https://i.ibb.co/p1Fm5yD/coxsbazar.png"
  }
  )

  const [loggedIn,setLoggedIn]=useState(false)
  const [name, setName]=useState("user")

  return (
    <MyContext.Provider value={[showArea,setShowArea,loggedIn,setLoggedIn,name,setName]}>
    <Router>
      <Switch>

        <Route exact path="/">
          <Home></Home>
        </Route>

        <Route path="/booking">
          <Booking></Booking>
        </Route>

        <Route path="/auth">
          <Auth></Auth>
        </Route>

        <PrivateRoute path="/see-hotel">
          <Hotels></Hotels>
        </PrivateRoute>

        <Route path="/news">
          <News></News>
        </Route>

        <Route path="/blog">
          <Blog></Blog>
        </Route>

        <Route path="/contact">
          <Contact></Contact>
        </Route>

        <Route path="/destination">
          <Destination></Destination>
        </Route>
      </Switch>
    </Router>
    </MyContext.Provider>
  );
}

export default App;
