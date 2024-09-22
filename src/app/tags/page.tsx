import TagView from "@/components/TagView";
import RouterButton from "@/components/RouterButton";
import { getTagsPageInfo } from "@/supabase/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faQuestion } from "@fortawesome/free-solid-svg-icons";

const viewHeight = 800;

function PreviewDiv({ children }: { children: (JSX.Element | string)[] }) {
  return (
    <div
      className="max-w-screen-lg w-full border-dotted border-[3px] border-[#aaaaaa] rounded-[16px] m-[16px] box-border text-center flex flex-col justify-center opacity-80"
      style={{ height: `${viewHeight - 32}px` }}
    >
      {children}
    </div>
  );
}

export default async function Tags({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const targetGroup = searchParams.group;
  const tagsPageInfo =
    typeof targetGroup === "string"
      ? await getTagsPageInfo(targetGroup)
      : typeof targetGroup === "undefined"
        ? await getTagsPageInfo(null)
        : undefined;

  return (
    <>
      <div className="p-[8px] text-center">
        {tagsPageInfo?.groups?.sort()?.map((group) => (
          <RouterButton
            key={group}
            url={`/tags?group=${group}`}
            className={`m-[5px] p-[10px] shadow bg-transparent border-[none] rounded-[16px] [transition:0.2s] hover:bg-brand ${
              group === targetGroup && "text-white bg-brand"
            }`}
            text={group}
          />
        ))}
      </div>
      <div className="flex flex-row justify-center">
        {!targetGroup ? (
          <PreviewDiv>
            <FontAwesomeIcon icon={faArrowUp} />
            카테고리를 선택하세요.
          </PreviewDiv>
        ) : typeof targetGroup !== "string" ||
          !tagsPageInfo?.groups?.includes(targetGroup) ? (
          <PreviewDiv>
            <FontAwesomeIcon icon={faQuestion} />
            잘못된 카테고리입니다.
          </PreviewDiv>
        ) : (
          <TagView
            key={targetGroup}
            root={tagsPageInfo?.root || undefined}
            tags={
              tagsPageInfo?.tags?.map(({ nextTags, ...rest }) => ({
                ...rest,
                nexts: nextTags.filter((next) => next !== null),
              })) || []
            }
            height={`${viewHeight}px`}
          />
        )}
      </div>
    </>
  );
}
