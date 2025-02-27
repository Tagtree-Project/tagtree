import { RowType, Table } from "@/data/api/local/database/Table";

export class TagTable extends Table<TagRowType> {
  path = "/tables/tags.csv";
  private tagMap = new Map<string, TagRowType>;
  private markdownMap = new Map<string, TagRowType>;

  getRowsFromRawContent = (raw: string) => {
    return raw.split("\n").slice(1).map(line => {
      const values = line.trim().split(",");
      return {
        tag: values[0],
        name: values[1],
        tier: Number(values[2]),
        markdownId: values[3].length > 0 ? values[3] : null,
      } as TagRowType;
    });
  };

  prepare = () => {
    this.rows.forEach(row => {
      this.tagMap.set(row.tag, row);
      if (row.markdownId) this.markdownMap.set(row.markdownId, row);
    });
  };

  getTag = (tag: string): TagRowType | undefined => {
    return this.tagMap.get(tag);
  };

  getTagByMarkdown = (markdownId: string): TagRowType | undefined => {
    return this.markdownMap.get(markdownId);
  }
}

type TagRowType = RowType & {
  tag: string
  name: string
  tier: number
  markdownId: string | null
}
