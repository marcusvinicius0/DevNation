import { User } from '../User/types';

export interface PublicationInterface {
  publication: {
	id?: string;
	publication?: string;
	userId?: string;
	imagePublicationUrl?: string;
	updatedAt?: string;
	createdAt: string;
	likes?: any[] | null;
	comments?: any[] | null;
	user: User;
	saveds?: any[] | null;
	company?: null;
	companyId?: null;
  }
}
