import Post from "@/pages/Post";

const Page = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params;
  return <Post postId={postId}/>;
};

export default Page;
