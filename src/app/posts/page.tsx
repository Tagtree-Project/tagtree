import PostCard from "@/components/PostCard";
import { getPostsPageInfo } from "@/supabase/apis";
import PageSelector from "@/components/PageSelector";

const pageSize = 15;

export default async function Posts({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 0;
  const postsPageInfo = await getPostsPageInfo(page * pageSize, pageSize);

  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="max-w-screen-lg border-box w-full p-[16px] flex flex-row flex-wrap justify-between gap-[20px] [&>*]:grow">
          {postsPageInfo?.markdowns.map(({ markdown, tags }) => (
            <PostCard
              key={tags[0].tag}
              to={"/posts/" + tags[0].tag}
              title={markdown.title}
              subtitle={markdown.subtitle}
              date={markdown.date}
              writer={markdown.writer}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="max-w-screen-lg border-box p-[16px]">
          {postsPageInfo?.totalCount && (
            <PageSelector
              baseUrl={"/posts"}
              pageCount={Math.ceil(postsPageInfo.totalCount / pageSize)}
              page={page}
            />
          )}
        </div>
      </div>
    </>
  );
}
