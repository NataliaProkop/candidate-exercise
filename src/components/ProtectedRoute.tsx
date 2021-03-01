import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useStore } from './ContexProvider';

export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
  const store = useStore();
  return (
    <Route
      {...rest}
      render={(props: RouteProps) =>
        store.isLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
