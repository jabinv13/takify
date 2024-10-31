import { Models } from "node-appwrite";

export type Wrokspace = Models.Document & {
  name: string;
  imageUrl: string;
  inviteCode: string;
  userId: string;
};
