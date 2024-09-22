import { createClient } from "@supabase/supabase-js";
import { PostsPageInfo, PostPageInfo, TagsPageInfo } from "./responses";

const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_ANON_KEY ?? ""
);

export async function getPostsPageInfo(
  start: number,
  count: number
): Promise<PostsPageInfo | undefined> {
  const { data, error } = await supabase.rpc("api_posts", {
    start: start,
    count: count,
  });
  console.log(data);
  return error ? undefined : data;
}

export async function getPostPageInfo(
  tag: string
): Promise<PostPageInfo | undefined> {
  const { data, error } = await supabase.rpc("api_post", {
    target_tag: tag,
  });
  console.log(data);
  return error ? undefined : data;
}

export async function getTagsPageInfo(
  group: string | null
): Promise<TagsPageInfo | undefined> {
  const { data, error } = await supabase.rpc("api_tags", {
    target_group: group,
  });
  console.log(data);
  return error ? undefined : data;
}

export async function getMarkdownUsingPath(
  path: string
): Promise<string | undefined> {
  const markdownData = await supabase.storage.from("markdowns").download(path);
  if (markdownData.error || !markdownData.data) return undefined;
  console.log(markdownData.data);
  return markdownData.data.text();
}
