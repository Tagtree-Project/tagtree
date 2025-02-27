import Post from "@/pages/Post";

const Page = ({ params }: { params: { postId: string } }) => {
  const postId = params.postId;

  return <Post postId={postId}/>;
};

export default Page;
