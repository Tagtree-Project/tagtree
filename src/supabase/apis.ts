import { createClient } from "@supabase/supabase-js";
import type { Group, Tag, Relation, Markdown } from "./responses";

const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_ANON_KEY ?? ""
);

export async function getAllGroups(): Promise<Group[] | undefined> {
  const { data, error } = await supabase
    .from("groups")
    .select("group_name, root_tag");
  return error
    ? undefined
    : data
    ? data.map((d) => ({ group: d.group_name, root: d.root_tag }))
    : [];
}

export async function getMarkdownsWithRelativeTags(
  start: number,
  count: number
): Promise<{ tags: Tag[]; markdown: Markdown }[] | undefined> {
  const { data, error } = await supabase.rpc(
    "get_markdown_with_relative_tags",
    {
      start: start,
      count: count,
    }
  );

  return error ? undefined : data ? data : [];
}

export async function getTagsOfGroup(
  group: string | null
): Promise<Tag[] | undefined> {
  const { data, error } = await supabase.rpc("get_tags_of_group", {
    target_group: group,
  });

  return error ? undefined : data ? data : [];
}

export async function getMarkdownCount(): Promise<number | undefined> {
  const { count, error } = await supabase
    .from("markdowns")
    .select("*", { head: true, count: "exact" });

  return error ? undefined : count ? count : 0;
}

export async function getTagMeta(tag: string): Promise<Tag | undefined> {
  const { data, error } = await supabase
    .from("tags")
    .select("tag, expression, tier, markdown_id")
    .eq("tag", tag)
    .single();

  return error
    ? undefined
    : data
    ? {
        tag: data.tag,
        expression: data.expression,
        tier: data.tier,
        markdownID: data.markdown_id,
      }
    : undefined;
}

export async function getRelations(
  tags: string[]
): Promise<Relation[] | undefined> {
  const { data, error } = await supabase
    .from("related")
    .select("prev_tag, next_tag")
    .in("prev_tag", tags)
    .in("next_tag", tags);

  return error
    ? undefined
    : data
    ? data.map((d) => ({ prev: d.prev_tag, next: d.next_tag }))
    : [];
}

export async function getPrevTags(tag: string): Promise<Tag[] | undefined> {
  const { data, error } = await supabase.rpc("get_prev_tags", {
    target_tag: tag,
  });
  return error ? undefined : data ? data : [];
}

export async function getNextTags(tag: string): Promise<Tag[] | undefined> {
  const { data, error } = await supabase.rpc("get_next_tags", {
    target_tag: tag,
  });
  return error ? undefined : data ? data : [];
}

export async function getRelatedTags(tag: string): Promise<Tag[] | undefined> {
  const prevTags = await getPrevTags(tag);
  const nextTags = await getNextTags(tag);
  return prevTags && nextTags ? [...prevTags, ...nextTags] : undefined;
}

export async function getMarkdownMeta(
  tag: string
): Promise<Markdown | undefined> {
  const { data, error } = await supabase.rpc("get_markdown", {
    target_tag: tag,
  });

  return error
    ? undefined
    : data
    ? {
        id: data.markdown_id,
        path: data.path,
        title: data.title,
        subtitle: data.subtitle,
        date: data.date,
        writer: data.writer,
      }
    : undefined;
}

export async function getMarkdownUsingPath(
  path: string
): Promise<string | undefined> {
  const markdownData = await supabase.storage.from("markdowns").download(path);
  if (markdownData.error || !markdownData.data) return undefined;

  return markdownData.data.text();
}

export async function getMarkdownUsingID(
  id: string
): Promise<string | null | undefined> {
  const { data, error } = await supabase
    .from("markdowns")
    .select("path")
    .eq("markdown_id", id)
    .single();
  return error ? undefined : data ? getMarkdownUsingPath(data.path) : null;
}
