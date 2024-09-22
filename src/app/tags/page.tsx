import TagView from "@/components/TagView";
import RouterButton from "@/components/RouterButton";
import DottedPlaceholder from "@/components/DottedPlaceholder";
import { Suspense } from "react";
import { getTagsPageInfo } from "@/supabase/apis";
import {
  faArrowUp,
  faQuestion,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const viewHeight = "500px";

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
    <DottedPlaceholder
      icon={faArrowUp}
      text="카테고리를 선택하세요."
      style={{ height: viewHeight }}
    />
  ) : !targetGroup || !tagsPageInfo?.groups?.includes(targetGroup) ? (
    <DottedPlaceholder
      icon={faQuestion}
      text="잘못된 카테고리입니다."
      style={{ height: viewHeight }}
    />
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
      <Suspense
        fallback={
          <DottedPlaceholder icon={faSpinner} text="카테고리 로딩중.." />
        }
      >
        <div className="p-[8px] text-center">
          <ButtonWrapper targetGroup={targetGroup} />
        </div>
      </Suspense>
      <Suspense
        fallback={
          <DottedPlaceholder
            icon={faSpinner}
            text="관련 태그 로딩중.."
            style={{ height: viewHeight }}
          />
        }
      >
        <div className="flex flex-row justify-center">
          <TagViewWrapper targetGroup={targetGroup} />
        </div>
      </Suspense>
    </>
  );
}
