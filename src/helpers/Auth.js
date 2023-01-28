import React from 'react';

import {Navigate} from 'react-router-dom'


const useAuth=()=>{
  const token=localStorage.getItem('id')
  if(token){
    return true
  } else {
    return false
  }
}

const  ProtectedRoutes=({children}) =>{

  const auth=useAuth()

  if(!auth){
    alert("No puedes ver esta página sin estar en una sesión activa.");
  };

  return auth ? children : <Navigate to="/" />;
}

export default ProtectedRoutes;
