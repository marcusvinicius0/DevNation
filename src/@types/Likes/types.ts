export interface LikeInterface {
  id: string;
  publicationId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface handleLike {
  userId: string;
  publicationId: string;
}
