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

export interface HandleCreatePublicationRequest {
  publication: PublicationObject;
  user: any;
  image_publication_url: string;
}

export interface LikeOrDeslikeRequest {
  user_id: string;
  publication_id: string;
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
