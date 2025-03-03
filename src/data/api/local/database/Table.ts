import { basementUrl } from "@/constants";

export abstract class Table<R extends RowType> {
  abstract readonly path: string;
  abstract readonly getRowsFromRawContent: (raw: string) => R[];
  abstract readonly prepare: () => void;

  rows: readonly R[] = [];

  readonly getRawContent = async () => {
    return await fetch(`${basementUrl}/${this.path}`).then(res => res.text());
  };
}

export type RowType = NonNullable<unknown>;
