import PostBanner from "@/components/server/PostBanner";
import TagView, { TagViewTagProp } from "@/components/client/TagView";
import Sidebar from "@/components/client/Sidebar";
import PostArticle from "@/components/server/PostArticle";
import DottedPlaceholder from "@/components/server/DottedPlaceholder";
import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import postRepository from "@/data/repositories/PostRepository";
import tagRepository from "@/data/repositories/TagRepository";
import { PostId } from "@/data/models/ids/PostId";

const BannerWrapper = async ({ postId }: { postId: PostId }) => {
  const postInfo = await postRepository.getPostInfo(postId);

  return postInfo && <PostBanner
    title={postInfo.title}
    subtitle={postInfo.subtitle}
    date={postInfo.date}
    writer={postInfo.writer}
  />;
};

const TagViewWrapper = async ({ postId }: { postId: PostId }) => {
  const postInfo = await postRepository.getPostInfo(postId);
  if (!postInfo) return null;

  const tags = await tagRepository.getTagRelations(postInfo.tag);
  return tags && <TagView
    root={postId}
    tags={Array.from(tags.values()).map(tag => {
      return {
        tag: tag.id,
        name: tag.name,
        tier: tag.tier,
        next: tag.next,
        postUrl: tag.markdownId ? `/posts/${tag.markdownId}` : null,
      } as TagViewTagProp;
    })}
  />;
};

const PostWrapper = async ({ postId }: { postId: PostId }) => {
  const postInfo = await postRepository.getPostInfo(postId);
  const content = postInfo && await postRepository.getPostContent(postInfo.id);

  return content ? (
    <>
      <PostArticle markdown={content}/>
      <div className="max-lg:hidden">
        <Sidebar markdown={content}/>
      </div>
    </>
  ) : (
    <div className="w-full h-full border-box p-[32px] text-center text-[2em] break-all">
      <FontAwesomeIcon icon={faTimes}/>
      <p>포스트를 찾을 수 없습니다.</p>
    </div>
  );
};

const Post = ({ postId }: { postId: PostId }) => {
  return (
    <>
      <Suspense
        fallback={<DottedPlaceholder icon={faSpinner} text="배너 로딩중.."/>}
      >
        <BannerWrapper postId={postId}/>
      </Suspense>
      <Suspense
        fallback={
          <DottedPlaceholder icon={faSpinner} text="관련 태그 로딩중.."/>
        }
      >
        <TagViewWrapper postId={postId}/>
      </Suspense>

      <Suspense
        fallback={<DottedPlaceholder icon={faSpinner} text="본문 로딩중.."/>}
      >
        <div className="max-w-full flex flex-row justify-center">
          <div className="w-full h-auto max-w-screen-lg flex flex-row gap-[16px]">
            <PostWrapper postId={postId}/>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Post;
