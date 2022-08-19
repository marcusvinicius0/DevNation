/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import firebase from '../services/firebaseConnection';
import { UserSignedContext } from './signed';

import { AuthContextData, AuthProviderProps, SignUpProps, UserSignedProps } from './types';

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [users, setUsers] = useState<UserSignedProps[] | []>([]);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        const uid: string = value.user?.uid || '';

        const res = await firebase.firestore().collection('users').doc(uid).get();

        if (res) {
          const data: UserSignedProps = {
            id: res.id,
            name: res.data()?.name || '',
            imageUserUrl: res.data()?.avatarUrl,
            bannerUserUrl: res.data()?.bannerUrl,
            email: value.user?.email || '',
            role: res.data()?.role,
            description: res.data()?.aboutMe,
            location: res.data()?.location,
            linkedin: res.data()?.linkedin,
            github: res.data()?.github,
            isVerified: res.data()?.verified,
            site: '',
            isUser: true,
          };

          changeUser(data);
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
            toast.success('Cadastro feito com sucesso. Agora faça seu login!');
          });
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      });
  }

  async function signOut() {
    await firebase.auth().signOut();
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

// !! = transforma o valor em boolean
