export interface LikesProps {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  publication_id: string;
}

export interface CommentsProps {
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

export interface PublicationProps {
  id: string;
  publication: string;
  user_id: string;
  image_publication_url?: string | null;
  user_avatar_url?: string;
  user_name: string;
  user_role?: string;
  user_is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
  likes?: LikesProps[] | null;
  comments?: CommentsProps[] | null;
}
