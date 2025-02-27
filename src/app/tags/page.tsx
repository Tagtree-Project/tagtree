import Tags from "@/pages/Tags";

const Page = async ({ searchParams }: { searchParams: Promise<{ group?: string }> }) => {
  const { group } = await searchParams;
  return <Tags groupName={group ?? null}/>;
};

export default Page;