import React from 'react';
import { Redirect, Route } from 'react-router';
import { useAuth } from './auth';
import { ROUTE_LOGIN } from './route-constants';

function ProtectedRoute ({ component: Component, ...rest }) {
  const { auth } =  useAuth();
  const a = ( 
    <Route
      {...rest}
      render={(props) => auth?.loggedIn? <Component {...props} />
        : <Redirect to={{ pathname: `${ROUTE_LOGIN}`, state: { from: props.location } }} />}
    />
  )
  console.log(a)
  return a;
}

export default ProtectedRoute;