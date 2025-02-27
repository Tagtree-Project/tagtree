import { RowType, Table } from "@/data/api/local/database/Table";

export class MarkdownTable extends Table<MarkdownRowType> {
  path = "/tables/markdowns.csv";
  private markdownMap = new Map<string, MarkdownRowType>();

  getRowsFromRawContent = (raw: string): MarkdownRowType[] => {
    return raw.split("\n").slice(1).map(line => {
      const values = line.trim().split(",");
      return {
        markdownId: values[0],
        title: values[1].length > 0 ? values[1] : null,
        subtitle: values[2].length > 0 ? values[2] : null,
        date: new Date(values[3]),
        writer: values[4].length > 0 ? values[4] : null,
        fileName: values[5],
      } as MarkdownRowType;
    }).toSorted((a, b) => a.date < b.date ? 1 : -1);
  };

  prepare = () => {
    this.rows.forEach(row => {
      this.markdownMap.set(row.markdownId, row);
    });
  };

  getMarkdownMeta = (id: string) => {
    return this.markdownMap.get(id);
  };

  getMarkdownMetas = (start: number, count: number) => {
    return this.rows.slice(start, start + count);
  }

  getTotalCount = () => {
    return this.rows.length;
  };
}

type MarkdownRowType = RowType & {
  markdownId: string
  title: string | null
  subtitle: string | null
  date: Date
  writer: string | null
  fileName: string
}