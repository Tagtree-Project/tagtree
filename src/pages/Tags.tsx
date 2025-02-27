import TagView, { TagViewTagProp } from "@/components/client/TagView";
import RouterButton from "@/components/client/RouterButton";
import DottedPlaceholder from "@/components/server/DottedPlaceholder";
import { Suspense } from "react";
import {
  faArrowUp,
  faQuestion,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import tagRepository from "@/data/repositories/TagRepository";

const viewHeight = "500px";

const ButtonWrapper = async ({ groupName }: { groupName: string | null }) => {
  const groups = await tagRepository.getAllGroups();

  return groups
    ?.sort((a, b) => a.groupName.localeCompare(b.groupName))
    ?.map((group) => {
      const isRoot = group.groupName === groupName;

      return (
        <RouterButton
          key={group.groupName}
          url={`/tags?group=${group.groupName}`}
          className={`m-[5px] p-[10px] shadow bg-transparent border-[none] rounded-[16px] [transition:0.2s] hover:bg-brand ${
            isRoot && "bg-brand"
          }`}
          style={isRoot ? { color: "white" } : undefined}
          text={group.groupName}
        />
      );
    });
};

const TagViewWrapper = async ({ groupName }: { groupName: string | null }) => {
  if (!groupName) return (
    <DottedPlaceholder
      icon={faArrowUp}
      text="카테고리를 선택하세요."
      style={{ height: viewHeight }}
    />
  );

  const groups = await tagRepository.getAllGroups();
  const tagGroup = groups.find((group) => group.groupName == groupName);

  if (!tagGroup) return (
    <DottedPlaceholder
      icon={faQuestion}
      text="잘못된 카테고리입니다."
      style={{ height: viewHeight }}
    />
  );

  const tags = await tagRepository.getTagRelationsInGroup(groupName);
  return tags && (
    <TagView
      key={groupName}
      root={tagGroup.rootTagId || undefined}
      tags={Array.from(tags.values()).map(tag => {
        return {
          tag: tag.id,
          name: tag.name,
          tier: tag.tier,
          next: tag.next,
          postUrl: tag.markdownId ? `/posts/${tag.markdownId}` : null,
        } as TagViewTagProp;
      })}
      height={viewHeight}
    />
  );
};

const Tags = ({ groupName }: { groupName: string | null }) => {
  return (
    <>
      <Suspense
        fallback={
          <DottedPlaceholder icon={faSpinner} text="카테고리 로딩중.."/>
        }
      >
        <div className="p-[8px] text-center">
          <ButtonWrapper groupName={groupName}/>
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
          <TagViewWrapper groupName={groupName}/>
        </div>
      </Suspense>
    </>
  );
};

export default Tags;