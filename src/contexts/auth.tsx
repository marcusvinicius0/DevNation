/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiDsn from '../services/apiDsn';
import firebase from '../services/firebaseConnection';
import { UserSignedContext } from './signed';

import { AuthContextData, AuthProviderProps, SignUpProps, UserSignedProps } from './types';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [users, setUsers] = useState<UserSignedProps[] | []>([]);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();

  const { user, changeUser } = useContext(UserSignedContext);

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
    async function loadUsers() {
      await firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          const allUsers: UserSignedProps[] = [];

          snapshot.forEach((userData) => {
            const dataUser: UserSignedProps = {
              id: userData.id,
              name: userData.data().name,
              imageUserUrl: userData.data().avatarUrl,
              bannerUserUrl: userData.data().bannerUrl,
              role: userData.data().role,
              email: userData.data().email,
              description: userData.data().aboutMe,
              location: userData.data().location,
              linkedin: userData.data().linkedin,
              github: userData.data().github,
              isVerified: userData.data().verified,
              site: '',
              isUser: true,
              username: '',
            };
            allUsers.push(dataUser);
          });

          setUsers(allUsers);
        });
    }
    loadUsers();
  }, []);

  function storageUser(data: UserSignedProps) {
    localStorage.setItem('InfoUserSystem', JSON.stringify(data));
  }

  async function signIn(email: string, password: string) {
    setLoadingAuth(true);

    await apiDsn
      .post('/signin', { email, password })
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
      .then((res) => {
        setLoadingAuth(false);
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function signOut() {
    localStorage.removeItem('InfoUserSystem');
    changeUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signOut,
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
