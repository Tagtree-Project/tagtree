import PostCard from "@/components/server/PostCard";
import DottedPlaceholder from "@/components/server/DottedPlaceholder";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Suspense } from "react";
import PageSelector from "@/components/client/PageSelector";
import postRepository from "@/data/repositories/PostRepository";

const PostsWrapper = async ({ page }: { page: number }) => {
  const postInfos = await postRepository.getPostInfosByPageNumber(page);

  return postInfos.map((info) => (
    <PostCard
      key={info.id}
      postUrl={`/posts/${info.id}`}
      title={info.title}
      subtitle={info.subtitle}
      date={info.date}
      writer={info.writer}
    />
  ));
};

const PageSelectorWrapper = async ({ page }: { page: number }) => {
  const { totalPostCount, maxPostsPerPage } = await postRepository.getPagingInfo();

  return (
    <PageSelector
      pageCount={Math.ceil(totalPostCount / maxPostsPerPage)}
      showingPageCount={5}
      currentPage={page}
      baseUrl={"/posts"}
    />
  );
};

const Posts = ({ page }: { page: number }) => {
  return (
    <>
      <Suspense
        fallback={<DottedPlaceholder icon={faSpinner} text="포스트 정보 로딩중.."/>}
      >
        <div className="flex flex-row justify-center">
          <div
            className="max-w-screen-lg border-box w-full p-[16px] flex flex-row flex-wrap justify-between gap-[20px] [&>*]:grow">
            <PostsWrapper page={page}/>
          </div>
        </div>
      </Suspense>

      <Suspense
        fallback={<DottedPlaceholder icon={faSpinner} text="로딩중.."/>}
      >
        <div className="flex flex-row justify-center">
          <div className="max-w-screen-lg border-box p-[16px]">
            <PageSelectorWrapper page={page}/>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default Posts;
