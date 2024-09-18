export type TagKey = string;
export type GroupKey = string;
export type MarkdownID = string;

export type Tag = {
  tag: TagKey;
  expression: string;
  tier: number;
  markdownID: MarkdownID | null;
};

export type Group = {
  group: GroupKey;
  root: TagKey | null;
};

export type Relation = {
  prev: TagKey;
  next: TagKey;
};

export type Markdown = {
  id: MarkdownID;
  path: string;
  title: string | null;
  subtitle: string | null;
  date: string | null;
  writer: string | null;
};
