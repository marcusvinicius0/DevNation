import { User } from '../User/types';

export interface PublicationInterface {
  id?: string;
  publication?: string;
  userId?: string;
  imagePublicationUrl?: string;
  updatedAt?: string;
  createdAt: string;
  likes?: any;
  comments?: any[] | null;
  user: User;
  saveds?: any[] | null;
  company?: null;
  companyId?: null;
}
