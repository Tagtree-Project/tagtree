import Tags from "@/pages/Tags";

const Page = ({
  searchParams,
}: {
  searchParams: { group?: string };
}) => {
  return <Tags groupName={searchParams?.group ?? null}/>;
};

export default Page;