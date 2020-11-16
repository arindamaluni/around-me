import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router';
import {ROUTE_LOGIN} from './route-constants';

function ProtectedRoute({component: Component, auth, ...rest}) {
  const a = (
    <Route
      {...rest}
      render={props =>
        auth?.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{pathname: `${ROUTE_LOGIN}`, state: {from: props.location}}}
          />
        )
      }
    />
  );
  console.log(a);
  return a;
}

const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps)(ProtectedRoute);
