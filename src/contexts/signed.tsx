/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import apiDsn from '../services/apiDsn';

import { UserSignedData, UserSignedProps, UserSignedProviderProps } from '../@types/Signed/types';

export const UserSignedContext = createContext<UserSignedData>({} as UserSignedData);

function UserSignedProvider({ children }: UserSignedProviderProps) {
  const [user, setUser] = useState<UserSignedProps | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      apiDsn.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
      setIsAuthenticated(true);
    } else {
      handleLogout();
    }

    setLoading(false);
  }, []);

  function changeStateIsAuthenticated(type: boolean) {
    setIsAuthenticated(type);
  }

  function handleLogout() {
    setLoading(true);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    apiDsn.defaults.headers.common['Authorization'] = false;
    history.push('/');
    changeUser(null);
    setLoading(false);
  }

  function changeUser(dataUser: UserSignedProps | null) {
    setUser(dataUser);
  }

  return (
    <UserSignedContext.Provider
      value={{
        changeUser,
        user,
        isAuthenticated,
        loading,
        changeStateIsAuthenticated,
        handleLogout,
      }}
    >
      {children}
    </UserSignedContext.Provider>
  );
}

export default UserSignedProvider;
