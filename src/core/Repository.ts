import { TagsWithRelation } from "@/core/models/TagWithRelation";
import { PostPagingInfo } from "@/core/models/PostPagingInfo";
import { PostId } from "@/core/models/ids/PostId";
import { PostInfo } from "@/core/models/PostInfo";
import { PostFullInfo } from "@/core/models/PostFullInfo";

export interface Repository {
  /**
   * for Tags/ButtonWrapper
   */
  getAllGroups: () => Promise<string[] | undefined>;

  /**
   * for Posts/PageSelectorWrapper
   */
  getPagingInfo: () => Promise<PostPagingInfo | undefined>;

  /**
   * for Post/PostWrapper
   * @param postId
   */
  getPostContent: (postId: PostId) => Promise<string | undefined>;

  /**
   * for Post/BannerWrapper
   * @param postId
   */
  getPostInfo: (postId: PostId) => Promise<PostFullInfo | undefined>;

  /**
   * for Posts/PostsWrapper
   * @param page
   */
  getPostInfosByPage: (page: number) => Promise<PostInfo[] | undefined>;

  /**
   * for Post/TagViewWrapper
   * @param postId
   */
  getTagRelations: (postId: string) => Promise<TagsWithRelation | undefined>;

  /**
   * for Tags/TagViewWrapper
   * @param groupName
   */
  getTagRelationsInGroup: (groupName: string) => Promise<TagsWithRelation | undefined>;
}

