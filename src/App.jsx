import React, { useState, useEffect } from 'react';
import './App.css';
import Swipe from "./pages/Swipe.jsx"
import OnBoarding from './pages/Onboarding.jsx';
import Cart from "./pages/Cart.jsx"
import { Routes, Route } from "react-router-dom"
import Newsletter from './pages/Newsletter.jsx';
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'


const App = () => {

  const [token, setToken] = useState(false)
 
   if(token){
     sessionStorage.setItem('token',JSON.stringify(token))
   }
 
   useEffect(() => {
     if(sessionStorage.getItem('token')){
       let data = JSON.parse(sessionStorage.getItem('token'))
       setToken(data)
     }
     
   }, [])
  return (
    <>
      <Routes>
        <Route path={'/signup'} element={ <SignUp />} />
        <Route path={'/'} element={ <Login setToken={setToken}/>} />
        <Route path='/swipenow' element={<Swipe />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/newsletter_signup" element={<Newsletter />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
