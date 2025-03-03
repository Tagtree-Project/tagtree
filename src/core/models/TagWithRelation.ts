import { Tag } from "@/core/models/Tag";
import { TagId } from "@/core/models/ids/TagId";

export type TagsWithRelation = {
  readonly root: TagId | null,
  readonly tags: Map<TagId, Tag & {
    readonly next: readonly TagId[],
    readonly prev: readonly TagId[],
  }>
}