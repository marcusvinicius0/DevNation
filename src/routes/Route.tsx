/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserSignedContext } from '../contexts/signed';

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
  const { isAuthenticated, loading } = useContext(UserSignedContext);

  if (loading) {
    return <div />;
  }

  if (!isAuthenticated && isPrivate) {
    return <Redirect to="/" />;
  }

  if (isAuthenticated && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
