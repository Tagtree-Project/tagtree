export type MarkdownMetaDTO = {
  id: string,
  file_name: string,
  title: string,
  subtitle: string | null,
  date: string,
  writer: string | null,
  tag: string | null,
};

export type PagedMarkdownMetaDTO = {
  id: string,
  title: string,
  subtitle: string | null,
  date: string,
  writer: string | null,
}[];

export type PagingInfoDTO = {
  total_count: number,
  page_size: number,
}

export type AllGroupNamesDTO = string[];

export type TagTier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND" | "RUBY";

export type GroupInfoWithTagsDTO = {
  group_name: string,
  root: string | null,
  tags: {
    tag: string,
    name: string,
    tier: TagTier,
    markdown_id: string | null,
  }[],
  relations: {
    next: string,
    prev: string,
  }[],
}

export type MarkdownMetaWithTagsDTO = {
  root: string | null,
  tags: {
    tag: string,
    name: string,
    tier: TagTier,
    markdown_id: string | null,
  }[],
  relations: {
    next: string,
    prev: string,
  }[],
}