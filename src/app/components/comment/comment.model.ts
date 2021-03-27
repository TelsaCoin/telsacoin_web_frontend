export interface Comment {
  id: number,
  author: string;
  createdAt: string;
  text: string;
  votes: number;
  permlink: string,
  comments?: Array<Comment>;
}
