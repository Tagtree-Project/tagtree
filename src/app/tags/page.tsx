import TagView from "@/components/TagView";
import RouterButton from "@/components/RouterButton";
import { Suspense } from "react";
import { getTagsPageInfo } from "@/supabase/apis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faQuestion,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const viewHeight = "500px";

function PreviewDiv({ children }: { children: (JSX.Element | string)[] }) {
  return (
    <div
      className="max-w-screen-lg w-full border-dotted border-[3px] border-[#aaaaaa] rounded-[16px] m-[16px] box-border text-center flex flex-col justify-center opacity-80"
      style={{ height: `calc(${viewHeight} - 32px)` }}
    >
      {children}
    </div>
  );
}

async function ButtonWrapper({ targetGroup }: { targetGroup: string | null }) {
  const tagsPageInfo = await getTagsPageInfo(targetGroup);


  return tagsPageInfo?.groups
    ?.sort()
    ?.map((group) => (
      <RouterButton
        key={group}
        url={`/tags?group=${group}`}
        className={`m-[5px] p-[10px] shadow bg-transparent border-[none] rounded-[16px] [transition:0.2s] hover:bg-brand ${
          group === targetGroup && "bg-brand"
        }`}
        style={group === targetGroup ? { color: "white" } : undefined}
        text={group}
      />
    ));
}

async function TagViewWrapper({ targetGroup }: { targetGroup: string | null }) {
  const tagsPageInfo = await getTagsPageInfo(targetGroup);

  return !targetGroup ? (
    <PreviewDiv>
      <FontAwesomeIcon icon={faArrowUp} />
      카테고리를 선택하세요.
    </PreviewDiv>
  ) : !targetGroup || !tagsPageInfo?.groups?.includes(targetGroup) ? (
    <PreviewDiv>
      <FontAwesomeIcon icon={faQuestion} />
      잘못된 카테고리입니다.
    </PreviewDiv>
  ) : (
    <TagView
      key={targetGroup}
      root={tagsPageInfo?.root || undefined}
      tags={tagsPageInfo?.tags || []}
      height={viewHeight}
    />
  );
}

export default function Tags({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const targetGroup =
    typeof searchParams.group === "string" ? searchParams.group : null;

  return (
    <>
      <div className="p-[8px] text-center">
        <Suspense
          fallback={
            <div className="flex flex-row justify-center items-center gap-[16px]">
              <FontAwesomeIcon icon={faSpinner} />
              카테고리 로딩중..
            </div>
          }
        >
          <ButtonWrapper targetGroup={targetGroup} />
        </Suspense>
      </div>
      <div className="flex flex-row justify-center">
        <Suspense
          fallback={
            <PreviewDiv>
              <FontAwesomeIcon icon={faSpinner} />
              관련 태그 로딩중..
            </PreviewDiv>
          }
        >
          <TagViewWrapper targetGroup={targetGroup} />
        </Suspense>
      </div>
    </>
  );
}
