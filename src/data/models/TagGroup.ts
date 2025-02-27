import { TagId } from "@/data/models/ids/TagId";

export type TagGroup = {
  readonly groupName: string,
  readonly rootTagId: TagId | null,
};
