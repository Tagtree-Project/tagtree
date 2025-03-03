import { PostId } from "@/core/models/ids/PostId";

export type PostInfo = {
  readonly id: PostId,
  readonly title: string | null,
  readonly subtitle: string | null,
  readonly date: Date,
  readonly writer: string | null,
};