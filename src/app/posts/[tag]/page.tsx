import PostBanner from "@/components/PostBanner";
import TagView from "@/components/TagView";
import Sidebar from "@/components/Sidebar";
import PostArticle from "@/components/PostArticle";
import {
  getTagMeta,
  getRelations,
  getRelatedTags,
  getMarkdownMeta,
  getMarkdownUsingPath,
} from "@/supabase/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./markdown.css";

export default async function Post({ params }: { params: { tag: string } }) {
  const tag = params.tag;

  const tagMeta = await getTagMeta(tag);
  if (!tagMeta) return;

  const tags = [...((await getRelatedTags(tag)) || []), tagMeta];

  const nexts = new Map();
  (await getRelations(tags.map(({ tag }) => tag)))?.forEach(
    ({ prev, next }) => {
      if (!nexts.has(prev)) nexts.set(prev, []);
      nexts.get(prev).push(next);
    }
  );

  const tagProps = tags.map(({ tag, expression, tier, markdownID }) => ({
    tag: tag,
    expression: expression,
    tier: tier,
    next: nexts.get(tag) ?? [],
    hasMarkdown: markdownID !== null,
  }));

  const markdownMeta = await getMarkdownMeta(tag);
  const markdown =
    markdownMeta && (await getMarkdownUsingPath(markdownMeta.path));

  return markdown !== null ? (
    <>
      {markdownMeta && <PostBanner {...markdownMeta} />}
      <TagView root={tag} tags={tagProps} />
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
