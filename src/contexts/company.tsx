// eslint-disable react/jsx-no-constructed-context-values 
/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserSignedContext } from './signed';

import {
  CompanyContextData,
  CompanyProps,
  ContextProviderProps,
  SignUpCompanyProps
} from './types';

export const CompanyContext = createContext<CompanyContextData>({} as CompanyContextData);

function CompanyProvider({ children }: ContextProviderProps) {
  const { changeUser } = useContext(UserSignedContext);
  const [company, setCompany] = useState<CompanyProps | null>(null);
  const [companies, setCompanies] = useState<CompanyProps[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
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
    async function loadCompanies() { }
    loadCompanies();
  }, []);

  function storageCompany(data: CompanyProps) {
    localStorage.setItem('InfoUserSystem', JSON.stringify(data));
  }

  async function signInCompany(email: string, password: string) {
    // if (res) {
    //   const data: CompanyProps = {
    //     id: res.id,
    //     name: res.data()?.name || '',
    //     quantityOfEmployee: res.data()?.quantityOfEmployee,
    //     companyLogoUrl: res.data()?.companyLogoUrl,
    //     email: value.user?.email || '',
    //     companyRole: res.data()?.companyRole,
    //     description: res.data()?.description,
    //     location: res.data()?.location,
    //     site: res.data()?.site,
    //     companyIsVerified: res.data()?.companyIsVerified,
    //     isUser: false,
    //   };
    //   const dataToChangeUser: UserSignedProps = {
    //     bannerUserUrl: res.data()?.companyLogoUrl,
    //     email: value.user?.email || '',
    //     id: res.id,
    //     name: res.data()?.name || '',
    //     role: res.data()?.companyRole,
    //     description: res.data()?.description,
    //     location: res.data()?.location,
    //     site: res.data()?.site,
    //     imageUserUrl: res.data()?.companyLogoUrl,
    //     isVerified: res.data()?.companyIsVerified,
    //     isUser: false,
    //   };
    //   changeUser(dataToChangeUser);
    //   setCompany(data);
    //   storageCompany(data);
    //   toast.success('Seja bem vindo(a) de volta!');
  }

  async function signUpCompany({
    name,
    email,
    password,
    quantityOfEmployee,
    location,
    companyRole,
  }: SignUpCompanyProps) {
    setLoadingAuth(true);
  }

  async function signOut() {
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
        loadingAuth,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export default CompanyProvider;
