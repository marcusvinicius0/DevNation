import { ReactNode } from 'react';
import { UserSignedProps } from '../Signed/types';

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  description?: null;
  role?: null;
  name: string;
  isVerified: boolean;
  bannerUrl: string;
  imageUserUrl?: null;
  location?: null;
  linkedin?: null;
  github?: null;
  stacks?: null;
  createdAt: string;
  updatedAt: string;
  companyId?: null;
}

export interface SignUpProps {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface EditUserProps {
  userId: string;
  name: string;
  description: string;
  role: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface UserAuthProviderProps {
  children: ReactNode;
}
export interface UserAuthContextData {
  signed: boolean;
  user: UserSignedProps | null;
  loading: boolean;
  signUp: ({ name, email, password }: SignUpProps) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  loadingAuth: boolean;
  storageUser: (data: UserSignedProps) => void;
  users: UserSignedProps[] | [];
  editInformations: ({
    userId,
    name,
    description,
    role,
    location,
    linkedin,
    github,
  }: EditUserProps) => Promise<void>;
}

export interface UserAuthContextData {
  signed: boolean;
  user: UserSignedProps | null;
  loading: boolean;
  signUp: ({ name, email, password }: SignUpProps) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  loadingAuth: boolean;
  storageUser: (data: UserSignedProps) => void;
  users: UserSignedProps[] | [];
}
