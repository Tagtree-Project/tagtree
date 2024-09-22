import PostCard from "@/components/PostCard";
import DottedPlaceholder from "@/components/DottedPlaceholder";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";
import { getPostsPageInfo } from "@/supabase/apis";
import PageSelector from "@/components/PageSelector";

const pageSize = 15;

async function PostsWrapper({ page }: { page: number }) {
  const postsPageInfo = await getPostsPageInfo(page * pageSize, pageSize);

  return postsPageInfo?.markdowns.map(({ markdown, tags }) => (
    <PostCard
      key={tags[0].tag}
      to={"/posts/" + tags[0].tag}
      title={markdown.title}
      subtitle={markdown.subtitle}
      date={markdown.date}
      writer={markdown.writer}
    />
  ));
}

async function PageSelectorWrapper({ page }: { page: number }) {
  const postsPageInfo = await getPostsPageInfo(page * pageSize, pageSize);

  return (
    postsPageInfo?.totalCount && (
      <PageSelector
        baseUrl={"/posts"}
        pageCount={Math.ceil(postsPageInfo.totalCount / pageSize)}
        page={page}
      />
    )
  );
}

export default function Posts({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 0;

  return (
    <>
      <Suspense
        fallback={<DottedPlaceholder icon={faSpinner} text="포스트 정보 로딩중.." />}
      >
        <div className="flex flex-row justify-center">
          <div className="max-w-screen-lg border-box w-full p-[16px] flex flex-row flex-wrap justify-between gap-[20px] [&>*]:grow">
            <PostsWrapper page={page} />
          </div>
        </div>
      </Suspense>

      <Suspense
        fallback={<DottedPlaceholder icon={faSpinner} text="로딩중.." />}
      >
        <div className="flex flex-row justify-center">
          <div className="max-w-screen-lg border-box p-[16px]">
            <PageSelectorWrapper page={page} />
          </div>
        </div>
      </Suspense>
    </>
  );
}
