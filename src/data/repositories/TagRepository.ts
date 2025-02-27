import { TagWithRelation } from "@/data/models/TagWithRelation";
import { TagGroup } from "@/data/models/TagGroup";
import { TagId } from "@/data/models/ids/TagId";
import { getAllGroups, getRelatedTagsByGroup, getRelatedTagsByTag } from "@/data/api/local/apis";
import { MarkdownID } from "@/data/api/supabase/responses";
import { TagRelationsDTO } from "@/data/api/local/dtos";

class TagRepository {
  getAllGroups = async (): Promise<TagGroup[]> => {
    const response = await getAllGroups();
    return response.map((group) => {
      return {
        groupName: group.groupName,
        rootTagId: group.rootTag,
      } as TagGroup;
    });
  };

  getTagRelations = async (tagId: TagId): Promise<Map<TagId, TagWithRelation> | undefined> => {
    const response = await getRelatedTagsByTag(tagId);
    return response ? getMapOfTagWithRelation(response) : undefined;
  };

  getTagRelationsInGroup = async (groupName: string): Promise<Map<TagId, TagWithRelation> | undefined> => {
    const response = await getRelatedTagsByGroup(groupName);
    return response ? getMapOfTagWithRelation(response) : undefined;
  };
}

const getMapOfTagWithRelation = (dto: TagRelationsDTO) => {
  const result: Map<
    TagId,
    {
      id: TagId,
      markdownId: MarkdownID | null,
      name: string,
      next: TagId[],
      prev: TagId[],
      tier: number,
    }
  > = new Map();

  dto.tags.forEach(tag => {
    result.set(
      tag.tag,
      {
        id: tag.tag,
        markdownId: tag.markdownId,
        name: tag.name,
        next: [],
        prev: [],
        tier: tag.tier,
      }
    )
  });

  dto.relations.forEach(relation => {
    [true, false].forEach(isPreviousTag => {
      const currentTag = isPreviousTag ? relation.prev : relation.next;
      const targetTag = isPreviousTag ? relation.next : relation.prev;
      const targetList = isPreviousTag ? result.get(currentTag)!.next : result.get(currentTag)!.prev;
      targetList.push(targetTag);
    });
  });

  return result as Map<TagId, TagWithRelation>;
}

const tagRepository = new TagRepository();
export default tagRepository;