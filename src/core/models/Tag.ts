import { TagId } from "@/core/models/ids/TagId";
import { PostId } from "@/core/models/ids/PostId";

export type Tag = {
  readonly id: TagId,
  readonly name: string,
  readonly tier: number,
  readonly postId: PostId | null,
};
