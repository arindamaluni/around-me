import { React } from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute ({ component: Component, authenticated, isPublic, ...rest }) {

  if (isPublic || (authenticated === true)) return <Route {...rest} render={(props) => <Component {...props} />} />
  return <Route {...rest} render={(props) => <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />

  // return (
  //   <Route
  //     {...rest}
  //     render={(props) => authenticated === true
  //       ? <Component {...props} />
  //       : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
  //   />
  // )
}

export default ProtectedRoute;