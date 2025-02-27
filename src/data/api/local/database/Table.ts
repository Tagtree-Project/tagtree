import { promises as fs } from "fs";
import path from "path";

export abstract class Table<R extends RowType> {
  abstract readonly path: string;
  abstract readonly getRowsFromRawContent: (raw: string) => R[];
  abstract readonly prepare: () => void;

  rows: readonly R[] = [];

  readonly getRawContent = async () => {
    const filePath = path.join(process.cwd(), this.path);
    return await fs.readFile(filePath, "utf-8");
  };
}

export type RowType = NonNullable<unknown>;
