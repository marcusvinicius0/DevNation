/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

export interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export interface UserSignedProps {
  id: string;
  email: string;
  name: string;
  role: string;
  imageUserUrl: string;
  bannerUserUrl: string;
  description: string;
  isVerified: boolean;
  location: string;
  github: string;
  linkedin: string;
  site: string;
  isUser: boolean;
}

export interface AuthContextData {
  signed: boolean;
  user: UserSignedProps | null;
  loading: boolean;
  signUp: ({ name, email, password }: SignUpProps) => Promise<void>;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  loadingAuth: boolean;
  storageUser: (data: UserSignedProps) => void;
  users: UserSignedProps[] | [];
}

export interface CompanyProps {
  id: string;
  name?: string;
  email?: string;
  quantityOfEmployee?: string;
  companyLogoUrl?: string;
  companyBannerUrl?: string;
  companyIsVerified?: boolean;
  companyRole?: string;
  description?: string;
  location?: string;
  site?: string;
  createdAt?: Date;
  isUser: boolean;
}

export interface ContextProviderProps {
  children: ReactNode;
}

export interface SignUpCompanyProps {
  name: string;
  email: string;
  password: string;
  quantityOfEmployee: string;
  location: string;
  companyRole: string;
}

export interface CompanyContextData {
  signedAsCompany: boolean;
  signUpCompany: (data: SignUpCompanyProps) => Promise<void>;
  signInCompany: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  company: CompanyProps | null;
  companies: CompanyProps[] | [];
  loading: boolean;
  loadingAuth: boolean;
}

export interface UserSignedData {
  changeUser: (dataUser: UserSignedProps | null) => void;
  user: UserSignedProps | null;
}
