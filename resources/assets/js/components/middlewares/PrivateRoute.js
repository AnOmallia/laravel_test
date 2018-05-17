import React from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth ? (
        <Component {...props} {...rest}/>
      ) : (
        <Redirect
          to='/login'
        />
      )
    }
  />
);

export default PrivateRoute;