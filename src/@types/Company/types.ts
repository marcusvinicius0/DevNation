import { ReactNode } from 'react';

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
  username: string;
  location: string;
  role: string;
  site: string;
}

export interface CompanyContextData {
  signedAsCompany: boolean;
  signUpCompany: (data: SignUpCompanyProps) => Promise<void>;
  signInCompany: (email: string, password: string) => Promise<void>;
  company: CompanyProps | null;
  companies: CompanyProps[] | [];
  loading: boolean;
  loadingAuth: boolean;
}
