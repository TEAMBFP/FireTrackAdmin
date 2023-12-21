import { Navigate, Route } from 'react-router-dom';


import PropTypes from 'prop-types';

PrivateRoute.propTypes = {
    children: PropTypes.node
};

function PrivateRoute({ children, ...rest }) {
  let auth = true
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Navigate
            to="/login"
            state={{ from: location }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;