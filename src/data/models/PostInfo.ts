import { PostId } from "@/data/models/ids/PostId";
import { TagId } from "@/data/models/ids/TagId";

export type PostInfo = {
  readonly id: PostId,
  readonly title: string | null,
  readonly subtitle: string | null,
  readonly date: Date,
  readonly writer: string | null,
  readonly tag: TagId,
};