import PostBanner from "@/components/server/PostBanner";
import TagView, { TagViewTagProp } from "@/components/client/TagView";
import Sidebar from "@/components/client/Sidebar";
import PostArticle from "@/components/server/PostArticle";
import DottedPlaceholder from "@/components/server/DottedPlaceholder";
import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { PostId } from "@/core/models/ids/PostId";
import repository from "@/di/Repository";

const BannerWrapper = async ({ postId }: { postId: PostId }) => {
  const postInfo = await repository.getPostInfo(postId);

  return postInfo && <PostBanner
    title={postInfo.title}
    subtitle={postInfo.subtitle}
    date={postInfo.date}
    writer={postInfo.writer}
  />;
};

const TagViewWrapper = async ({ postId }: { postId: PostId }) => {
  const relation = await repository.getTagRelations(postId);

  return relation && <TagView
    root={relation.root ?? undefined}
    tags={Array.from(relation.tags.values()).map(tag => {
      return {
        tag: tag.id,
        name: tag.name,
        tier: tag.tier,
        next: tag.next,
        postUrl: tag.postId ? `/posts/${tag.postId}` : null,
      } as TagViewTagProp;
    })}
  />;
};

const PostWrapper = async ({ postId }: { postId: PostId }) => {
  const content = await repository.getPostContent(postId);

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
