/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import firebase from '../services/firebaseConnection';

import {
  CompanyContextData,
  CompanyProps,
  ContextProviderProps,
  SignUpCompanyProps,
} from './types';

export const CompanyContext = createContext<CompanyContextData>({} as CompanyContextData);

function CompanyProvider({ children }: ContextProviderProps) {
  const [company, setCompany] = useState<CompanyProps | null>(null);
  const [companies, setCompanies] = useState<CompanyProps[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [token, setToken] = useState(null);

  useEffect(() => {
    function loadStorage() {
      const storageCompanyData = localStorage.getItem('InfoUserSystem');

      if (storageCompanyData) {
        setCompany(JSON.parse(storageCompanyData));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  useEffect(() => {
    async function loadCompanies() {
      await firebase
        .firestore()
        .collection('companies')
        .get()
        .then((snapshot) => {
          const allCompanies: CompanyProps[] = [];

          snapshot.forEach((userData) => {
            const dataUser: CompanyProps = {
              id: userData.id,
              name: userData.data().name,
              companyLogoUrl: userData.data().companyLogoUrl,
              companyBannerUrl: userData.data().bannerUrl,
              companyRole: userData.data().companyRole,
              email: userData.data().email,
              description: userData.data().description,
              location: userData.data().location,
              site: userData.data().site,
              companyIsVerified: userData.data().companyIsVerified,
              isUser: false,
            };
            allCompanies.push(dataUser);
          });

          setCompanies(allCompanies);
        });
    }
    loadCompanies();
  }, []);

  function storageCompany(data: CompanyProps) {
    localStorage.setItem('InfoUserSystem', JSON.stringify(data));
  }

  async function signInCompany(email: string, password: string) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        const uid: string = value.user?.uid || '';

        const res = await firebase.firestore().collection('companies').doc(uid).get();

        if (res) {
          const data: CompanyProps = {
            id: res.id,
            name: res.data()?.name || '',
            quantityOfEmployee: res.data()?.quantityOfEmployee,
            companyLogoUrl: res.data()?.companyLogoUrl,
            email: value.user?.email || '',
            companyRole: res.data()?.companyRole,
            description: res.data()?.description,
            location: res.data()?.location,
            site: res.data()?.site,
            companyIsVerified: res.data()?.companyIsVerified,
            isUser: false,
          };

          setCompany(data);
          storageCompany(data);
          toast.success('Seja bem vindo(a) de volta!');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Oops, algo deu errado. Tente novamente mais tarde.');
      });
  }

  async function signUpCompany({
    name,
    email,
    password,
    quantityOfEmployee,
    location,
    companyRole,
  }: SignUpCompanyProps) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        const uid: string = value.user?.uid || '';

        await firebase
          .firestore()
          .collection('companies')
          .doc(uid)
          .set({
            id: uid,
            name,
            email,
            quantityOfEmployee,
            companyLogoUrl: null,
            companyBannerUrl: null,
            companyIsVerified: false,
            companyRole,
            description: '',
            location,
            site: '',
            createdAt: new Date(),
          })
          .then(() => {
            toast.success('Cadastro feito com sucesso. Agora faça seu login!');
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem('InfoUserSystem');
    setCompany(null);
  }

  return (
    <CompanyContext.Provider
      value={{
        signedAsCompany: !!company,
        signUpCompany,
        signInCompany,
        signOut,
        company,
        companies,
        loading,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export default CompanyProvider;
