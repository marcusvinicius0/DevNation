import { ReactNode } from 'react';

export interface PublicationsProviderProps {
  children: ReactNode;
}

export interface LikesObject {
  id: string;
  user_id: string;
  created_at: string;
  type?: 'like' | 'deslike';
  updated_at: string;
  publication_id: string;
}

export interface CommentsObject {
  id: string;
  user_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  user_name: string;
  user_role: string;
  user_avatar_url: string;
  user_is_verified: boolean;
  publication_id: string;
}

export interface PublicationObject {
  id: string;
  publication: string;
  user_id: string;
  image_publication_url?: null | string;
  updated_at: Date | string;
  created_at: Date | string;
  user_avatar_url: string;
  user_name: string;
  user_role: string;
  user_is_verified: boolean;
  likes?: LikesObject[] | null | undefined;
  comments?: CommentsObject[] | null;
}

export interface RegisterNewComment {
  comment: string;
  publication_id: string;
  user_id: string;
  user_name: string;
  user_role: string;
  user_avatar_url: string;
  user_is_verified: boolean;
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
  user: UserProps;
  image_publication_url: string;
}

export interface HandleCreateCommentRequest {
  comment: CommentsObject;
  user: UserProps;
  image_publication_url: string;
}

export interface LikeOrDeslikeRequest {
  user_id: string;
  publication_id: string;
}

interface ReturnLikeOrDeslike {
  type: string;
  likes: LikesObject[];
}

export interface UsePublicationsHookData {
  publications: PublicationObject[];
  loadPublications: () => Promise<void>;
  handleDeletePublication: (publication_id: string) => Promise<void>;
  loadingPublications: boolean;
  handleCreatePublication: ({
    publication,
    user,
    image_publication_url,
  }: HandleCreatePublicationRequest) => Promise<void>;
  loadUserPublications: (user_id: string) => Promise<void>;
  userPublications: PublicationObject[];
  likeOrDeslikePublication: ({ user_id, publication_id }: LikeOrDeslikeRequest) => Promise<ReturnLikeOrDeslike>;
  loadPublicationById: (publication_id: string) => Promise<void>;
  publication: PublicationObject;
  registerNewComment: HandleCreateCommentRequest;
  loading: boolean;
}
