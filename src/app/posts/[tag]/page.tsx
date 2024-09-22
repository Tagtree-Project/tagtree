import PostBanner from "@/components/PostBanner";
import TagView from "@/components/TagView";
import Sidebar from "@/components/Sidebar";
import PostArticle from "@/components/PostArticle";
import { getPostPageInfo, getMarkdownUsingPath } from "@/supabase/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./markdown.css";

export default async function Post({ params }: { params: { tag: string } }) {
  const tag = params.tag;
  const postPageInfo = await getPostPageInfo(tag);
  const markdown =
    postPageInfo?.markdown &&
    (await getMarkdownUsingPath(postPageInfo.markdown.path));

  return postPageInfo?.markdown ? (
    <>
      <PostBanner {...postPageInfo.markdown} />
      <TagView
        root={tag}
        tags={postPageInfo.tags.map(({ nextTags, ...rest }) => ({
          ...rest,
          nexts: nextTags.filter((next) => next !== null),
        }))}
      />
      {
        <div className="max-w-full flex flex-row justify-center">
          <div className="w-full h-auto max-w-screen-lg flex flex-row gap-[16px]">
            {markdown && (
              <>
                <PostArticle markdown={markdown} />
                <div className="max-lg:hidden">
                  <Sidebar markdown={markdown} />
                </div>
              </>
            )}
          </div>
        </div>
      }
    </>
  ) : (
    <div className="w-full h-full border-box p-[32px] text-center text-[2em] break-all">
      <FontAwesomeIcon icon={faTimes} />
      <p>포스트를 찾을 수 없습니다.</p>
    </div>
  );
}
