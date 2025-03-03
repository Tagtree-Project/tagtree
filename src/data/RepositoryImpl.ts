import { Repository } from "@/core/Repository";
import {
  getAllGroupName,
  getGroupInfoWithTags, getMarkdownContent,
  getMarkdownMeta,
  getPagedMarkdownMetas,
  getPagingInfo,
  getTagInfosRelatedWithMarkdown,
} from "@/data/api/apis";
import { PostPagingInfo } from "@/core/models/PostPagingInfo";
import { PostId } from "@/core/models/ids/PostId";
import { PostInfo } from "@/core/models/PostInfo";
import { PostFullInfo } from "@/core/models/PostFullInfo";
import { TagId } from "@/core/models/ids/TagId";
import { TagTier } from "@/data/api/dtos";
import { TagsWithRelation } from "@/core/models/TagWithRelation";
import { Tag } from "@/core/models/Tag";

export class RepositoryImpl implements Repository {
  getAllGroups = async () => {
    const response = await getAllGroupName();
    return response ? response as string[] : undefined;
  };

  getPagingInfo = async () => {
    const response = await getPagingInfo();
    return response ? {
      totalPostCount: response.total_count,
      maxPostsPerPage: response.page_size,
    } as PostPagingInfo : undefined;
  };

  getPostContent = async (postId: PostId) => {
    return await getMarkdownContent(postId);
  };

  getPostInfo = async (postId: PostId) => {
    const response = await getMarkdownMeta(postId);
    return response ? {
      id: response.id,
      title: response.title,
      subtitle: response.subtitle,
      date: new Date(response.date),
      writer: response.writer,
      fileName: response.file_name,
      tag: response.tag,
    } as PostFullInfo : undefined;
  };

  getPostInfosByPage = async (page: number) => {
    const response = await getPagedMarkdownMetas(page);
    return response ? response.map(res => {
      return {
        id: res.id,
        title: res.title,
        subtitle: res.subtitle,
        date: new Date(res.date),
        writer: res.writer,
      } as PostInfo;
    }) : undefined;
  };

  getTagRelations = async (postId: PostId) => {
    const response = await getTagInfosRelatedWithMarkdown(postId);
    return response ? {
      root: response.root,
      tags: getMapOfTagWithRelation(response),
    } as TagsWithRelation : undefined;
  };

  getTagRelationsInGroup = async (groupName: string) => {
    const response = await getGroupInfoWithTags(groupName);
    return response ? {
      root: response.root,
      tags: getMapOfTagWithRelation(response),
    } as TagsWithRelation : undefined;
  };
}

const getMapOfTagWithRelation = (
  dto: {
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
  },
) => {
  const result: Map<
    TagId,
    Tag & {
    next: TagId[],
    prev: TagId[],
  }
  > = new Map();

  dto.tags.forEach(tag => {
    result.set(
      tag.tag,
      {
        id: tag.tag,
        postId: tag.markdown_id,
        name: tag.name,
        next: [],
        prev: [],
        tier: {
          BRONZE: 0,
          SILVER: 1,
          GOLD: 2,
          PLATINUM: 3,
          DIAMOND: 4,
          RUBY: 5,
        }[tag.tier],
      },
    );
  });

  dto.relations.forEach(relation => {
    [true, false].forEach(isPreviousTag => {
      const currentTag = isPreviousTag ? relation.prev : relation.next;
      const targetTag = isPreviousTag ? relation.next : relation.prev;
      const targetList = isPreviousTag ? result.get(currentTag)!.next : result.get(currentTag)!.prev;
      targetList.push(targetTag);
    });
  });

  return result;
};