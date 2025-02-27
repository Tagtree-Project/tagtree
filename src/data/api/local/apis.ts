import getTable from "@/data/api/local/database/TableFactory";
import { TagTable } from "@/data/api/local/database/tables/TagTable";
import { MarkdownTable } from "@/data/api/local/database/tables/MarkdownTable";
import { RelationTable } from "@/data/api/local/database/tables/RelationTable";
import {
  AllGroupDTO,
  MarkdownMetaDTO,
  PagedMarkdownMetaDTO,
  PagingInfoDTO, TagDTO,
  TagRelationsDTO,
} from "@/data/api/local/dtos";
import { GroupTable } from "@/data/api/local/database/tables/GroupTable";
import { InclusionTable } from "@/data/api/local/database/tables/InclusionTable";
import markdownBucket from "@/data/api/local/database/buckets/MarkdownBucket";

const pageSize = 10;

const getTagInfo = (tagTable: TagTable, tag: string): TagDTO | undefined => {
  const tagInfo = tagTable.getTag(tag);
  return tagInfo ? {
    tag: tagInfo.tag,
    name: tagInfo.name,
    tier: tagInfo.tier,
    markdownId: tagInfo.markdownId,
  } as TagDTO : undefined;
};

export const getPagingInfo = async (): Promise<PagingInfoDTO> => {
  const markdownTable = await getTable(MarkdownTable);

  return {
    pageSize: pageSize,
    totalMarkdownCount: markdownTable.getTotalCount(),
  } as PagingInfoDTO;
};

export const getAllGroups = async (): Promise<AllGroupDTO> => {
  const groupTable = await getTable(GroupTable);
  return groupTable.getAll().map(group => {
    return {
      groupName: group.groupName,
      rootTag: group.rootTag,
    };
  }) as AllGroupDTO;
};

export const getRelatedTagsByGroup = async (groupName: string): Promise<TagRelationsDTO | undefined> => {
  const tagTable = await getTable(TagTable);
  const inclusionTable = await getTable(InclusionTable);
  const relationTable = await getTable(RelationTable);

  const domain = inclusionTable.getTags(groupName)?.map(row => row.tag);
  if (!domain) return undefined;

  const relations = relationTable.getAllRelatedTagsByCodomain(new Set(domain));
  return {
    tags: domain.map(tag => getTagInfo(tagTable, tag)!),
    relations: relations.map(tag => {
      return {
        prev: tag.prevTag,
        next: tag.nextTag,
      };
    })
  } as TagRelationsDTO;
};

export const getRelatedTagsByTag = async (tag: string): Promise<TagRelationsDTO | undefined> => {
  const tagTable = await getTable(TagTable);
  const relationTable = await getTable(RelationTable);

  if (!tagTable.getTag(tag)) return undefined;

  const tags = relationTable.getAllRelatedTags(tag);
  const relations = relationTable.getAllRelatedTagsByCodomain(tags);
  return {
    tags: Array.from(tags).map(tag => getTagInfo(tagTable, tag)!),
    relations: relations.map(tag => {
      return {
        prev: tag.prevTag,
        next: tag.nextTag,
      };
    })
  } as TagRelationsDTO;
};

export const getMarkdownMeta = async (markdownId: string): Promise<MarkdownMetaDTO | undefined> => {
  const tagTable = await getTable(TagTable);
  const markdownTable = await getTable(MarkdownTable);

  const meta = markdownTable.getMarkdownMeta(markdownId);
  return meta ? {
    markdownId: meta.markdownId,
    tag: tagTable.getTagByMarkdown(meta.markdownId)!.tag,
    title: meta.title,
    subtitle: meta.subtitle,
    date: meta.date,
    writer: meta.writer,
    fileName: meta.fileName,
  } as MarkdownMetaDTO : undefined;
};

export const getMarkdownMetas = async (page: number): Promise<PagedMarkdownMetaDTO> => {
  const tagTable = await getTable(TagTable);
  const markdownTable = await getTable(MarkdownTable);

  return markdownTable.getMarkdownMetas(pageSize * page, pageSize).map(meta => {
    return {
      markdownId: meta.markdownId,
      tag: tagTable.getTagByMarkdown(meta.markdownId)!.tag,
      title: meta.title,
      subtitle: meta.subtitle,
      date: meta.date,
      writer: meta.writer,
      fileName: meta.fileName,
    };
  }) as PagedMarkdownMetaDTO;
};

export const getMarkdownContent = async (markdownId: string): Promise<string | undefined> => {
  const markdownTable = await getTable(MarkdownTable);
  const meta = markdownTable.getMarkdownMeta(markdownId);

  return meta ? await markdownBucket.getFileByName(meta.fileName) : undefined;
};