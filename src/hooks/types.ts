import { ReactNode } from 'react';

export interface PublicationsProviderProps {
  children: ReactNode;
}

export interface LikesObject {
  id: string;
  userId: string;
  createdAt: string;
  type?: 'like' | 'deslike';
  updatedAt: string;
  publicationId: string;
}

export interface CommentsObject {
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

export interface PublicationObject {
  id: string;
  publication: string;
  userId: string;
  imagePublicationUrl?: null | string;
  updatedAt: Date | string;
  createdAt: Date | string;
  userAvatarUrl: string;
  userName: string;
  userRole: string;
  userIsVerified: boolean;
  likes?: LikesObject[] | null | undefined;
  comments?: CommentsObject[] | null;
}

export interface RegisterNewComment {
  comment: string;
  publicationId: string;
  userId: string;
  userName: string;
  userRole: string;
  userAvatarUrl: string;
  userIsVerified: boolean;
}

export interface UserProps {
  uid: string;
  name: string;
  avatarUrl: string;
  bannerUrl: string;
  role: string;
  email: string;
  aboutMe: string;
  location: string;
  linkedin: string;
  github: string;
  isVerified: boolean;
}

export interface HandleCreatePublicationRequest {
  publication: PublicationObject;
  userId: string;
  imagePublicationUrl: string;
}

export interface HandleCreateCommentRequest {
  comment: CommentsObject;
  user: UserProps;
  imagePublicationUrl: string;
}

export interface LikeOrDeslikeRequest {
  userId: string;
  publicationId: string;
}

export interface ReturnOfLikeOrDeslike {
  type: string;
  likes: LikesObject[] | [];
}

export interface UsePublicationsHookData {
  publications: PublicationObject[];
  loadPublications: () => Promise<void>;
  handleDeletePublication: (publicationId: string) => Promise<void>;
  loadingPublications: boolean;
  handleCreatePublication: ({
    publication,
    userId,
    imagePublicationUrl,
  }: HandleCreatePublicationRequest) => Promise<void>;
  loadUserPublications: (userId: string) => Promise<void>;
  userPublications: PublicationObject[];
  likeOrDeslikePublication: ({ userId, publicationId }: LikeOrDeslikeRequest) => Promise<void>;
  loadPublicationById: (publicationId: string) => Promise<void>;
  publication: PublicationObject | {};
  registerNewComment: (data: RegisterNewComment) => Promise<void>;
  loading: boolean;
  resLikeOrDeslike: ReturnOfLikeOrDeslike;
}

export interface UseProjectsHookData {}

export interface ProjectsProviderProps {
  children: ReactNode;
}

export interface UseOpportunitiesHookData {}

export interface OpportunitiesProviderProps {
  children: ReactNode;
}
