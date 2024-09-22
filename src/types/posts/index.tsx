export type PostType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  totalRepliesCount: number;
  reactions: { reaction: string; reacted: boolean }[];
};
