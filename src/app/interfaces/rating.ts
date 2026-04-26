export interface Rating {
  id?: string;
  movieId: number;
  userId: string;
  score: number;
  comment: string;
  createdAt: Date;
}
