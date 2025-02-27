export type TagKey = string;
export type GroupKey = string;
export type MarkdownID = string;

export type Tag = {
  tag: TagKey;
  expression: string;
  tier: number;
  markdownID: MarkdownID | null;
};

export type Markdown = {
  id: MarkdownID;
  path: string;
  title: string;
  subtitle: string | null;
  date: string | null;
  writer: string | null;
};

export type PostsPageInfo = {
  totalCount: number;
  markdowns: {
    markdown: Markdown;
    tags: Tag[];
  }[];
};

export type PostPageInfo = {
  tags: (Tag & { nextTags: TagKey[] })[] | null;
  markdown: Markdown | null;
};

export type TagsPageInfo = {
  groups: GroupKey[];
  root: TagKey | null;
  tags: (Tag & { nextTags: TagKey[] })[] | null;
};
