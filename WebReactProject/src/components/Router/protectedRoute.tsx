import * as React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { isGranted } from '../../lib/abpUtility';

declare var abp: any;

const ProtectedRoute = ({ path, component: Component, permission, render, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!abp.session.userId) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          );
        }

        if (permission && !isGranted(permission)) {
          return (
            <Redirect
              to={{
                pathname: '/exception',
                state: { from: props.location },
              }}
            />
          );
        }

        if (Component === null) {
          return <></>
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
