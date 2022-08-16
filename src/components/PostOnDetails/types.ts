export interface LikesProps {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  publicationId: string;
  length?: number;
}

export interface CommentsProps {
  id: string;
  userId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  userRole: string;
  userAvatarUrl: string;
  userIsVerified: boolean;
  publicationId: string;
}

export interface PublicationProps {
  id: string;
  publication: string;
  userId: string;
  imagePublicationUrl?: string | null;
  userAvatarUrl?: string;
  userName: string;
  userRole?: string;
  userIsVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  likes?: LikesProps[] | null;
  comments?: CommentsProps[] | null;
}

export interface VerifyButtonLike {
  likes: LikesProps[];
}

export interface HandleLikeRequest {
  userId: string;
  publicationId: string;
}

export interface PopoverActiveProps {
  publicationId: string;
  userId: string;
}

export interface ParamsProps {
  id: string;
}
