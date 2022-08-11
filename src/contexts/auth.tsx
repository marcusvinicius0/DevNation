/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import firebase from '../services/firebaseConnection';

import { AuthContextData, AuthProviderProps, SignUpProps, UserProps } from './types';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [users, setUsers] = useState<UserProps[] | []>([]);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // const [token, setToken] = useState(null);

  useEffect(() => {
    function loadStorage() {
      const storageUserData = localStorage.getItem('UserSystem');

      if (storageUserData) {
        setUser(JSON.parse(storageUserData));
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
          const allUsers: UserProps[] = [];

          snapshot.forEach((userData) => {
            const dataUser: UserProps = {
              uid: userData.id,
              name: userData.data().name,
              avatarUrl: userData.data().avatarUrl,
              bannerUrl: userData.data().bannerUrl,
              role: userData.data().role,
              email: userData.data().email,
              aboutMe: userData.data().aboutMe,
              location: userData.data().location,
              linkedin: userData.data().linkedin,
              github: userData.data().github,
              isVerified: userData.data().verified,
            };
            allUsers.push(dataUser);
          });

          setUsers(allUsers);
        });
    }
    loadUsers();
  }, []);

  function storageUser(data: UserProps) {
    localStorage.setItem('UserSystem', JSON.stringify(data));
  }

  async function signIn(email: string, password: string) {
    setLoadingAuth(true);

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        const uid: string = value.user?.uid || '';

        const res = await firebase.firestore().collection('users').doc(uid).get();

        if (res) {
          const data: UserProps = {
            uid: res.id,
            name: res.data()?.name || '',
            avatarUrl: res.data()?.avatarUrl,
            bannerUrl: res.data()?.bannerUrl,
            email: value.user?.email || '',
            role: res.data()?.role,
            aboutMe: res.data()?.aboutMe,
            location: res.data()?.location,
            linkedin: res.data()?.linkedin,
            github: res.data()?.github,
            isVerified: res.data()?.verified,
          };

          setUser(data);
          storageUser(data);
          setLoadingAuth(false);
          toast.success('Seja bem vindo(a) de volta!');
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
        toast.error('Oops, algo deu errado. Tente novamente mais tarde.');
      });
  }

  async function signUp({ name, email, password }: SignUpProps) {
    setLoadingAuth(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        const uid: string = value.user?.uid || '';

        await firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .set({
            name,
            avatarUrl: null,
            bannerUrl: null,
            publication: [],
            role: '',
            aboutMe: '',
            location: '',
            linkedin: '',
            github: '',
            createdAt: new Date(),
          })
          .then(() => {
            setLoadingAuth(false);
            toast.success('Cadastro feito com sucesso. Seja bem vindo(a)!');
          });
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem('UserSystem');
    setUser(null);
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

// !! = transforma o valor em boolean
