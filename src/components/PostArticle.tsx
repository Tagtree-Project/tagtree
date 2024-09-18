import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax";
import rehypeSlug from "rehype-slug";
import { appName } from "@/constants";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";

export default function PostArticle({ markdown }: { markdown: string }) {
  return (
    <main className="markdown" id={`${appName}-article`}>
      <ReactMarkdown
        components={{
          a(props) {
            const { href, ...rest } = props;
            if (href) return <Link href={href} {...rest} />;
            else return <a {...props} />;
          },

          pre(props) {
            const { className } = props;
            return className === "mermaid" ? (
              <pre style={{ opacity: "0.5" }}>
                현재 블로그 개편의 일환으로 다이어그램을 그리는 방식을
                최적화하고 있습니다. 개편이 완료될 동안 다이어그램은 표시되지
                않습니다.
              </pre>
            ) : (
              <pre {...props} />
            );
          },

          img() {
            return (
              <pre style={{ opacity: "0.5" }}>
                현재 블로그 개편의 일환으로 이미지를 저장하는 곳을 변경하고 있습니다.
                개편이 완료될 동안 외부 리소스를 제외한 이미지는 표시되지 않습니다.
              </pre>
            );
          },
        }}
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeMathjax, rehypeSlug, rehypeRaw]}
      >
        {markdown}
      </ReactMarkdown>
    </main>
  );
}
