import { RowType, Table } from "@/data/api/local/database/Table";

class TableFactory {
  private static readonly tables = new Map<string, Table<RowType>>();

  static readonly getTable = async <R extends RowType, T extends Table<R>>(
    tableClass: { new(): T },
  ): Promise<T> => {
    const instance = this.tables.get(tableClass.name);
    if (instance) return instance as T;

    const newInstance = new tableClass();
    const raw = await newInstance.getRawContent();
    newInstance.rows = newInstance.getRowsFromRawContent(raw);
    newInstance.prepare();
    this.tables.set(tableClass.name, newInstance);
    return newInstance;
  };
}

export default TableFactory.getTable;