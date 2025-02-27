import { TagId } from "@/data/models/ids/TagId";
import { PostId } from "@/data/models/ids/PostId";

export type Tag = {
  readonly id: TagId,
  readonly name: string,
  readonly tier: number,
  readonly markdownId: PostId | null,
};
