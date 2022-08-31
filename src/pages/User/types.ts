import { PublicationObject } from '../../hooks/types';

export interface UserProps {
  company?: Company | null;
  bannerUrl?: string | null;
  github?: string | null;
  linkedin?: string | null;
  imageUserUrl?: string | null;
  description?: string | null;
  role?: string | null;
  email: string;
  id: string;
  location?: string | null;
  name: string;
  isVerified: boolean;
  stacks?: string[] | null;
  updatedAt?: string;
  createdAt?: string;
  username: string;
  projects?: Project[] | [];
  publications?: PublicationObject[] | [];
}

interface Company {
  x: string;
}

interface Project {
  x: string;
}
