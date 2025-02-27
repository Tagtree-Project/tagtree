import { PostInfo } from "@/data/models/PostInfo";
import { PostId } from "@/data/models/ids/PostId";
import { PostPagingInfo } from "@/data/models/PostPagingInfo";
import {
  getMarkdownContent, getMarkdownMeta,
  getMarkdownMetas,
  getPagingInfo,
} from "@/data/api/local/apis";

class PostRepository {
  getPagingInfo = async (): Promise<PostPagingInfo> => {
    const response = await getPagingInfo();
    return {
      totalPostCount: response.totalMarkdownCount,
      maxPostsPerPage: response.pageSize,
    } as PostPagingInfo;
  };

  getPostInfo = async (postId: PostId): Promise<PostInfo | undefined> => {
    const response = await getMarkdownMeta(postId);
    return response ? {
      id: response.markdownId,
      title: response.title,
      subtitle: response.subtitle,
      date: response.date,
      writer: response.writer,
      tag: response.tag,
    } as PostInfo : undefined;
  };

  getPostInfosByPageNumber = async (page: number): Promise<PostInfo[]> => {
    const response = await getMarkdownMetas(page);
    return response.map(meta => {
      return {
        id: meta.markdownId,
        title: meta.title,
        subtitle: meta.subtitle,
        date: meta.date,
        writer: meta.writer,
        tag: meta.tag,
      } as PostInfo;
    });
  };

  getPostContent = async (postId: PostId): Promise<string | undefined> => {
    return await getMarkdownContent(postId);
  };
}

const markdownRepository = new PostRepository();
export default markdownRepository;