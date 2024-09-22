type TagKey = string;
type GroupKey = string;
type MarkdownID = string;

type Tag = {
  tag: TagKey;
  expression: string;
  tier: number;
  markdownID: MarkdownID | null;
};

type Markdown = {
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
  tags: (Tag & { nextTags: TagKey[] | [null] })[] | null;
  markdown: Markdown | null;
};

export type TagsPageInfo = {
  groups: GroupKey[];
  root: TagKey | null;
  tags: (Tag & { nextTags: TagKey[] | [null] })[] | null;
};
