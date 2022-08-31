/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiDsn from '../services/apiDsn';
import { UserSignedContext } from './signed';

import {
  CompanyContextData,
  CompanyProps,
  ContextProviderProps,
  SignUpCompanyProps,
  UserSignedProps,
} from './types';

export const CompanyContext = createContext<CompanyContextData>({} as CompanyContextData);

function CompanyProvider({ children }: ContextProviderProps) {
  const { changeUser } = useContext(UserSignedContext);
  const [company, setCompany] = useState<CompanyProps | null>(null);
  const [companies, setCompanies] = useState<CompanyProps[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);

  const history = useHistory();
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
    async function loadCompanies() {}
    loadCompanies();
  }, []);

  function storageCompany(data: CompanyProps) {
    localStorage.setItem('InfoUserSystem', JSON.stringify(data));
  }

  async function signInCompany(email: string, password: string) {
    setLoadingAuth(true);
    await apiDsn
      .post('/signincompany', { email, password })
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
            linkedin: '',
            github: '',
            isVerified: res.data.isVerified,
            site: res.data.site,
            isUser: false,
            username: res.data.username,
          };
          changeUser(data);
          storageCompany(data);
          setLoadingAuth(false);
          history.push('/dashboard');
          toast.success('Seja bem vindo(a) de volta!');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Ops, algo deu errado!');
        setLoadingAuth(false);
      });
  }

  async function signUpCompany({
    name,
    email,
    username,
    password,
    location,
    companyRole,
    site,
  }: SignUpCompanyProps) {
    setLoadingAuth(true);
    await apiDsn
      .post('/companies', { name, email, username, password, location, companyRole, site })
      .then((res) => {
        if (res) {
          history.push('/sigin');
          toast.success('Empresa cadastrada com sucesso!');
          setLoadingAuth(false);
        }
      })
      .catch((err) => {
        toast.error('Ops, algo deu errado.');
      });
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
