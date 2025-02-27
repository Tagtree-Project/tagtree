import { Bucket } from "@/data/api/local/database/Bucket";

class MarkdownBucket extends Bucket {
  path = "markdowns"
}

const markdownBucket = new MarkdownBucket();
export default markdownBucket;