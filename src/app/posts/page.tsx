import Posts from "@/pages/Posts";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 0;

  return <Posts page={page}/>;
}

export default Page;
