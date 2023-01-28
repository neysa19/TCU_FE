import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home.js';
import Account from './components/Account/account.js';
import ProtectedRoutes from './helpers/Auth.js';
import Login from './components/login.js';
import Register from './components/register.js'
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element = {<Register/>}/>
        {//<Route exact path="/home" element = {<ProtectedRoutes><Home/></ProtectedRoutes>}/>
        }
        <Route exact path="/home" element = {<Home/>}/>

        <Route exact path="/users/:id" element = {<ProtectedRoutes><Account/></ProtectedRoutes>}/>
      </Routes>
    </>
  ); 
}

export default App;
