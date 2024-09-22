import PostBanner from "@/components/PostBanner";
import TagView from "@/components/TagView";
import Sidebar from "@/components/Sidebar";
import PostArticle from "@/components/PostArticle";
import { Suspense } from "react";
import { getPostPageInfo, getMarkdownUsingPath } from "@/supabase/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./markdown.css";

async function BannerWrapper({ tag }: { tag: string }) {
  const postPageInfo = await getPostPageInfo(tag);
  return postPageInfo?.markdown && <PostBanner {...postPageInfo.markdown} />;
}

async function TagViewWrapper({ tag }: { tag: string }) {
  const postPageInfo = await getPostPageInfo(tag);
  return postPageInfo?.tags && <TagView root={tag} tags={postPageInfo.tags} />;
}

async function PostWrapper({ tag }: { tag: string }) {
  const postPageInfo = await getPostPageInfo(tag);
  const markdown =
    postPageInfo?.markdown &&
    (await getMarkdownUsingPath(postPageInfo.markdown.path));

  return markdown ? (
    <>
      <PostArticle markdown={markdown} />
      <div className="max-lg:hidden">
        <Sidebar markdown={markdown} />
      </div>
    </>
  ) : (
    <div className="w-full h-full border-box p-[32px] text-center text-[2em] break-all">
      <FontAwesomeIcon icon={faTimes} />
      <p>포스트를 찾을 수 없습니다.</p>
    </div>
  );
}

export default function Post({ params }: { params: { tag: string } }) {
  const tag = params.tag;

  return (
    <>
      <Suspense fallback={<div className="text-center">로딩중...</div>}>
        <BannerWrapper tag={tag} />
      </Suspense>
      <Suspense fallback={<div className="text-center">로딩중...</div>}>
        <TagViewWrapper tag={tag} />
      </Suspense>
      <div className="max-w-full flex flex-row justify-center">
        <div className="w-full h-auto max-w-screen-lg flex flex-row gap-[16px]">
          <Suspense fallback={<div className="text-center">로딩중...</div>}>
            <PostWrapper tag={tag} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
