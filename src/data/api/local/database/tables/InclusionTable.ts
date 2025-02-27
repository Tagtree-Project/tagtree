import { RowType, Table } from "@/data/api/local/database/Table";

export class InclusionTable extends Table<InclusionRowType> {
  path = "/tables/includes.csv";
  private groupMap = new Map<string, InclusionRowType[]>();

  getRowsFromRawContent = (raw: string) => {
    return raw.split("\n").slice(1).map(line => {
      const values = line.trim().split(",");
      return {
        groupName: values[0],
        tag: values[1],
      } as InclusionRowType;
    });
  };

  prepare = () => {
    this.rows.forEach(row => {
      if (!this.groupMap.has(row.groupName))
        this.groupMap.set(row.groupName, []);
      this.groupMap.get(row.groupName)?.push(row);
    });
  };

  getTags = (groupName: string) => {
    return this.groupMap.get(groupName);
  }
}

type InclusionRowType = RowType & {
  groupName: string
  tag: string
};