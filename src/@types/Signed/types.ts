import { ReactNode } from 'react';
export interface UserSignedProps {
  id: string;
  email: string;
  name: string;
  role: string;
  imageUserUrl?: string;
  bannerUserUrl?: string;
  description?: string;
  isVerified?: boolean;
  location?: string;
  github?: string;
  linkedin?: string;
  site?: string;
  isUser: boolean;
  username: string;
}

export interface UserSignedData {
  changeUser: (dataUser: UserSignedProps | null) => void;
  user: UserSignedProps | null;
  isAuthenticated: boolean;
  loading: boolean;
  changeStateIsAuthenticated: (type: boolean) => void;
  handleLogout: () => void;
}

export interface UserSignedProviderProps {
  children: ReactNode;
}
