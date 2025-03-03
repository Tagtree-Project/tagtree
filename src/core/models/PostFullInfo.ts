import { PostInfo } from "@/core/models/PostInfo";

export type PostFullInfo = PostInfo & {
  fileName: string;
  tag: string;
};