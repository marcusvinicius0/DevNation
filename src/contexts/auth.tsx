/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiDsn from '../services/apiDsn';
import { UserSignedContext } from './signed';

import { AuthContextData, AuthProviderProps, SignUpProps, UserSignedProps } from './types';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [users] = useState<UserSignedProps[] | []>([]);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line

  const history = useHistory();

  const { user, changeUser, changeStateIsAuthenticated } = useContext(UserSignedContext);

  useEffect(() => {
    function loadStorage() {
      const storageUserData = localStorage.getItem('InfoUserSystem');

      if (storageUserData) {
        changeUser(JSON.parse(storageUserData));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  useEffect(() => {
    // async function loadUsers() { }
    // loadUsers();
  }, []);

  function storageUser(data: UserSignedProps) {
    localStorage.setItem('InfoUserSystem', JSON.stringify(data));
  }

  async function signIn(email: string, password: string) {
    setLoadingAuth(true);

    await apiDsn
      .post('/users/signin', { email, password })
      .then((res) => {
        if (res) {
          const data: UserSignedProps = {
            id: res.data.id,
            name: res.data.name || '',
            imageUserUrl: res.data.imageUserUrl,
            bannerUserUrl: res.data.bannerUserUrl,
            email: res.data.email || '',
            role: res.data.role,
            description: res.data.description,
            location: res.data.location,
            linkedin: res.data.linkedin,
            github: res.data.github,
            isVerified: res.data.verified,
            site: '',
            isUser: true,
            username: res.data.username,
          };

          changeUser(data);
          storageUser(data);
          setLoadingAuth(false);
          changeStateIsAuthenticated(true);
          apiDsn.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
          localStorage.setItem('token', JSON.stringify(res.data.token));
          history.push('/dashboard');
          toast.success('Seja bem vindo(a) de volta!');
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingAuth(false);
      });
  }

  async function signUp({ name, username, email, password }: SignUpProps) {
    setLoadingAuth(true);
    await apiDsn
      .post('/users', { name, username, email, password })
      .then(() => {
        setLoadingAuth(false);
        history.push('/signin');
        toast.success('Usuário cadastrado com sucesso.');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (

    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signIn,
        loadingAuth,
        storageUser,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
