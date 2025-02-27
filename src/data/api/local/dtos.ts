export type TagRelationsDTO = {
  tags: TagDTO[],
  relations: {
    prev: string,
    next: string,
  }[]
}

export type TagDTO = {
  tag: string,
  name: string,
  tier: number,
  markdownId: string | null,
}

export type AllGroupDTO = {
  groupName: string,
  rootTag: string,
}[]

export type MarkdownMetaDTO = {
  markdownId: string
  tag: string
  title: string | null
  subtitle: string | null
  date: Date
  writer: string | null
  fileName: string
}

export type PagedMarkdownMetaDTO = MarkdownMetaDTO[]

export type PagingInfoDTO = {
  pageSize: number,
  totalMarkdownCount: number,
}