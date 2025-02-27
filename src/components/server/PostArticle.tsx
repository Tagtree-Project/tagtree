import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax";
import rehypeSlug from "rehype-slug";
import { appNameEnglish } from "@/constants";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import "@/styles/markdown.css";
import { compressObjectToUrlSafeBase64 } from "@/utils/pako";

const PostArticle = ({ markdown }: { markdown: string }) => {
  return (
    <main className="markdown" id={`${appNameEnglish}-article`}>
      <ReactMarkdown
        components={{
          a(props) {
            const { href, ...rest } = props;
            if (href) return <Link href={href} {...rest} />;
            else return <a {...props} />;
          },

          code(props) {
            const { className, children } = props;
            const classNames = className?.split(" ") ?? [];
            if (!classNames.includes("language-mermaid")) return <code {...props} />;

            const query = compressObjectToUrlSafeBase64({ code: children?.toString() });
            // eslint-disable-next-line @next/next/no-img-element
            return <img
              src={`https://mermaid.ink/svg/pako:${query}`}
              alt="다이어그램"
              style={{ width: "100%", height: "auto" }}
            />;
          },
        }}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeMathjax, rehypeSlug]}
      >
        {markdown}
      </ReactMarkdown>
    </main>
  );
};

export default PostArticle;