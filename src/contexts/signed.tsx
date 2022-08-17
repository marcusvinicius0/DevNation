/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';

import { ContextProviderProps, UserSignedData, UserSignedProps } from './types';

export const UserSignedContext = createContext<UserSignedData>({} as UserSignedData);

function UserSignedProvider({ children }: ContextProviderProps) {
  const [user, setUser] = useState<UserSignedProps | null>(null);

  function changeUser(dataUser: UserSignedProps | null) {
    setUser(dataUser);
  }

  return (
    <UserSignedContext.Provider
      value={{
        changeUser,
        user,
      }}
    >
      {children}
    </UserSignedContext.Provider>
  );
}

export default UserSignedProvider;
