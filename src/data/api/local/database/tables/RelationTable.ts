import { RowType, Table } from "@/data/api/local/database/Table";

export class RelationTable extends Table<RelationRowType> {
  path = "/tables/related.csv";
  private prevMap = new Map<string, RelationRowType[]>();
  private nextMap = new Map<string, RelationRowType[]>();

  getRowsFromRawContent = (raw: string) => {
    return raw.split("\n").slice(1).map(row => {
      const values = row.trim().split(",");
      return {
        prevTag: values[0],
        nextTag: values[1],
      } as RelationRowType;
    });
  };

  prepare = () => {
    this.rows.forEach(row => {
      if (!this.prevMap.has(row.nextTag))
        this.prevMap.set(row.nextTag, []);
      this.prevMap.get(row.nextTag)?.push(row);

      if (!this.nextMap.has(row.prevTag))
        this.nextMap.set(row.prevTag, []);
      this.nextMap.get(row.prevTag)?.push(row);
    });
  };

  getAllRelatedTags = (tag: string) => {
    const domain: Set<string> = new Set([tag]);

    [true, false].forEach(isForwarding => {
      const queue = [tag];
      while (queue.length > 0) {
        const currentTag = queue.shift()!;
        const rows = isForwarding ? this.nextMap.get(currentTag) : this.prevMap.get(currentTag);
        rows?.forEach(row => {
          const newTag = isForwarding ? row.nextTag : row.prevTag;
          if (!domain.has(newTag)) queue.push(newTag);
          domain.add(newTag);
        });
      }
    });

    return domain;
  };

  getAllRelatedTagsByCodomain = (codomain: Set<string>) => {
    return this.rows.filter(row => codomain.has(row.prevTag) && codomain.has(row.nextTag));
  };
}

type RelationRowType = RowType & {
  prevTag: string
  nextTag: string
}