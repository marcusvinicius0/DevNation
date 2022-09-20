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
