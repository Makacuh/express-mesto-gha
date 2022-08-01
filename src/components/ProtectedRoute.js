import React from 'react';
import { Navigate, Route } from 'react-router-dom';

function ProtecedRoute ({component: Component, ...props}) {
  return(
    
      props.loggedIn ? <Component {...props} /> : <Navigate to='/sign-in' />
    
  )
}

export default ProtecedRoute;