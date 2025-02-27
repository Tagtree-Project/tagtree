import { RowType, Table } from "@/data/api/local/database/Table";

export class GroupTable extends Table<GroupRowType> {
  path = "/tables/groups.csv";

  getRowsFromRawContent = (raw: string) => {
    return raw.split("\n").slice(1).map(line => {
      const values = line.trim().split(",");
      return {
        groupName: values[0],
        rootTag: values[1],
      } as GroupRowType;
    });
  };

  prepare = () => {};

  getAll = () => {
    return this.rows;
  };
}

type GroupRowType = RowType & {
  groupName: string
  rootTag: string
}