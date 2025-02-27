import { Tag } from "@/data/models/Tag";
import { TagId } from "@/data/models/ids/TagId";

export type TagWithRelation = Tag & {
  readonly next: readonly TagId[],
  readonly prev: readonly TagId[],
};