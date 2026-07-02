export interface Rating {
  movieId: number;
  userId: string;
  score: number;
  comment: string;
  createdAt: Date | string;
}
