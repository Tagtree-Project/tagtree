import { promises as fs } from "fs";
import path from "path";

export abstract class Bucket {
  abstract path: string

  getFileByName = async (name: string) => {
    const filePath = path.join(process.cwd(), "buckets", this.path, name);
    return await fs.readFile(filePath, "utf-8");
  }
}