import {
  AllGroupNamesDTO,
  GroupInfoWithTagsDTO,
  MarkdownMetaDTO, MarkdownMetaWithTagsDTO,
  PagedMarkdownMetaDTO,
  PagingInfoDTO,
} from "@/data/api/dtos";
import { supabase } from "@/data/api/supabase/supabase";
import { basementUrl } from "@/constants";

const pageSize = 15;

export const getAllGroupName = async (): Promise<AllGroupNamesDTO | undefined> => {
  const { data, error } = await supabase.rpc("get_all_group_name");
  return error ? undefined : data as AllGroupNamesDTO;
};

export const getGroupInfoWithTags = async (target_group: string): Promise<GroupInfoWithTagsDTO | undefined> => {
  const { data, error } = await supabase.rpc("get_group_info_with_tags", { target_group });
  return error ? undefined : data as GroupInfoWithTagsDTO;
};

export const getPagingInfo = async (): Promise<PagingInfoDTO | undefined> => {
  const { data, error } = await supabase.rpc("get_markdown_count");
  return error ? undefined : { total_count: data, page_size: pageSize } as PagingInfoDTO;
};

export const getPagedMarkdownMetas = async (page: number): Promise<PagedMarkdownMetaDTO | undefined> => {
  const { data, error } = await supabase.rpc("get_paged_markdown_metas", { count: pageSize, start: page * pageSize });
  return error ? undefined : data as PagedMarkdownMetaDTO;
};

export const getMarkdownMeta = async (markdownId: string): Promise<MarkdownMetaDTO | undefined> => {
  const { data, error } = await supabase.rpc('get_markdown_meta', { id: markdownId, })
  return error ? undefined : data as MarkdownMetaDTO;
};

export const getTagInfosRelatedWithMarkdown = async (markdownId: string): Promise<MarkdownMetaWithTagsDTO | undefined> => {
  const { data, error } = await supabase.rpc('get_tag_infos_related_with_markdown', { target_markdown_id: markdownId });
  return error ? undefined : data as MarkdownMetaWithTagsDTO;
}

export const getMarkdownContent = async (markdownId: string): Promise<string | undefined> => {
  const meta = await getMarkdownMeta(markdownId);
  return meta && await fetch(`${basementUrl}/markdowns/${meta.file_name}`).then(res => res.text());
}