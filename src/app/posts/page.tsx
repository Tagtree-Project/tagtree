import Posts from "@/pages/Posts";

const Page = async ({ searchParams, }: { searchParams: Promise<{ page?: number }>}) => {
  const { page } = await searchParams;
  return <Posts page={page ?? 0}/>;
}

export default Page;
