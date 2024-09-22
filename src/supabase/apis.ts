import { createClient } from "@supabase/supabase-js";
import { PostsPageInfo, PostPageInfo, TagsPageInfo, Tag } from "./responses";

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

  return error ? undefined : data;
}

export async function getPostPageInfo(
  tag: string
): Promise<PostPageInfo | undefined> {
  const { data, error } = await supabase.rpc("api_post", {
    target_tag: tag,
  });

  const tags = new Set(data.tags?.map(({ tag }: { tag: string }) => tag) || []);
  return error
    ? undefined
    : {
        ...data,
        tags:
          data.tags?.map(
            (tag: Tag & { nextTags: (string | null)[] | null }) => ({
              ...tag,
              nextTags:
                tag.nextTags?.filter((nextTag) => tags.has(nextTag)) || [],
            })
          ) || [],
      };
}

export async function getTagsPageInfo(
  group: string | null
): Promise<TagsPageInfo | undefined> {
  const { data, error } = await supabase.rpc("api_tags", {
    target_group: group,
  });

  const tags = new Set(data.tags?.map(({ tag }: { tag: string }) => tag) || []);
  return error
    ? undefined
    : {
        ...data,
        tags:
          data.tags?.map(
            (tag: Tag & { nextTags: (string | null)[] | null }) => ({
              ...tag,
              nextTags:
                tag.nextTags?.filter((nextTag) => tags.has(nextTag)) || [],
            })
          ) || [],
      };
}

export async function getMarkdownUsingPath(
  path: string
): Promise<string | undefined> {
  const markdownData = await supabase.storage.from("markdowns").download(path);
  return markdownData.error ? undefined : markdownData.data.text();
}
