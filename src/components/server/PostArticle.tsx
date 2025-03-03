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
import DiagramView from "@/components/client/DiagramView";

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
            if (!classNames.includes("language-mermaid") || !children) return <code {...props} />;
            else return <DiagramView script={children.toString()}/>;
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