/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

interface RouteWrapperProps {
  component: any;
  isPrivate?: boolean;
  [x: string]: any;
}

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}: RouteWrapperProps) {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div />;
  }

  //   if (!signed && isPrivate) {
  //     return <Redirect to="/" />;
  //   }

  //   if (signed && !isPrivate) {
  //     return <Redirect to="/dashboard" />;
  //   }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
