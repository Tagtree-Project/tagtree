"use client";

import { useRef, useEffect, useCallback } from "react";
import type { TouchEvent, MouseEvent } from "react";
import { renderToString } from "react-dom/server";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faSpinner } from "@fortawesome/free-solid-svg-icons";
import mermaid from "mermaid";

const tierColor = `
classDef tier0 fill:#ad5600, color:#fff, stroke:#0000
classDef tier1 fill:#435f7a, color:#fff, stroke:#0000
classDef tier2 fill:#ec9a00, color:#fff, stroke:#0000
classDef tier3 fill:#27e2a4, color:#fff, stroke:#0000
classDef tier4 fill:#00b4fc, color:#fff, stroke:#0000
classDef tier5 fill:#ff0062, color:#fff, stroke:#0000
`;

const shadowFilter = `
<defs>
  <filter id="drop-shadow" x="-100%" y="-100%" width="300%" height="300%">
    <feFlood flood-color="black" result="color"/>
    <feComposite in2="SourceGraphic" in="color" operator="in"/>
    <feGaussianBlur stdDeviation="3"/>
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.5"/>
    </feComponentTransfer>
    <feOffset dx="1" dy="2"/>
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>
`;

export interface TagViewTagProps {
  tag: string;
  expression: string;
  tier: number;
  nextTags: string[];
  markdownID: string | null;
}

export default function TagView({
  root,
  tags,
  height,
}: {
  root: string | undefined;
  tags: TagViewTagProps[];
  height?: string | undefined;
}) {
  const router = useRouter();

  // 렌더링 관련 변수
  const ref = useRef<HTMLDivElement>(null);
  const isDragStarted = useRef(false);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const scrollPos = useRef({ left: 0, top: 0 });

  const onDragStart = useCallback((event: TouchEvent | MouseEvent) => {
    isDragging.current = false;
    if (ref.current) {
      ref.current.scrollLeft = scrollPos.current.left;
      ref.current.scrollTop = scrollPos.current.top;
    }
    [startPos.current.x, startPos.current.y] =
      "touches" in event
        ? [event.touches[0].pageX, event.touches[0].pageY]
        : [event.pageX, event.pageY];
    isDragStarted.current = true;
  }, []);

  const onDrag = useCallback((event: TouchEvent | MouseEvent) => {
    if (!isDragStarted.current) return;
    isDragging.current = true;
    if (ref.current) {
      const [pageX, pageY] =
        "touches" in event
          ? [event.touches[0].pageX, event.touches[0].pageY]
          : [event.pageX, event.pageY];
      ref.current.scrollLeft =
        scrollPos.current.left - pageX + startPos.current.x;
      ref.current.scrollTop =
        scrollPos.current.top - pageY + startPos.current.y;
    }
  }, []);

  const onDragEnd = useCallback((event: TouchEvent | MouseEvent) => {
    if (ref.current) {
      scrollPos.current.left = ref.current.scrollLeft;
      scrollPos.current.top = ref.current.scrollTop;
    }
    if (isDragging.current && event.cancelable) event.preventDefault();
    isDragStarted.current = false;
  }, []);

  // Mermaid 다이어그램을 로드하고 초기 설정을 진행
  useEffect(() => {
    // 관계 그래프 생성
    const graph = tags
      .sort((a, b) => a.tag.localeCompare(b.tag))
      .map(({ tag, nextTags }) =>
        nextTags
          .sort((a, b) => a.localeCompare(b))
          .map((nextTag) => `#${tag} --> #${nextTag}`)
      )
      .flat()
      .join("\n");

    // 태그 노드 생성
    const nodes = tags
      .map(({ tag, expression, tier, markdownID: hasMarkdown }) => {
        const node = renderToString(
          <div
            className={`tag-node ${tag === root ? "root-tag" : ""} ${
              hasMarkdown ? "clickable-tag" : ""
            }`}
            style={{
              width: "max-content",
              height: "30px",
              fontFamily: "Noto Sans KR",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
            draggable="false"
          >
            {hasMarkdown && (
              <span
                style={{
                  backgroundColor: "red",
                  borderRadius: "50%",
                  display: "inline-flex",
                  width: "30px",
                  height: "30px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon icon={faCode} />
              </span>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "5px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                #{expression}
              </span>
              <span
                className="tag-text"
                style={{
                  fontSize: "0.8em",
                }}
              >
                {tag}
              </span>
            </div>
          </div>
        );

        return `#${tag}(["${node}"]):::tier${tier}`;
      })
      .join("\n");

    // 전체 스크립트 생성
    const mermaidScript = `graph LR\n${graph}\n${nodes}\n${tierColor}`;

    // 렌더링
    mermaid
      .render(`tagview-${Math.random().toString().slice(2)}`, mermaidScript)
      .then(({ bindFunctions, svg }) => {
        if (!ref.current || !bindFunctions) return;

        ref.current.innerHTML = svg;
        bindFunctions(ref.current);
        const current = ref.current.firstChild as SVGSVGElement;

        // 크기 조정
        current.setAttribute(
          "width",
          `${
            Number(
              current
                .computedStyleMap()
                ?.get("max-width")
                ?.toString()
                .slice(0, -2)
            ) * 0.8
          }px`
        );

        // 태그 라우팅
        const clickableTagElements = current.querySelectorAll(".clickable-tag");
        clickableTagElements.forEach((tagElement) => {
          const tag = (
            tagElement.querySelector("span.tag-text") as HTMLSpanElement
          ).innerText;
          tagElement.addEventListener("click", (event) => {
            event.preventDefault();
            if (!isDragging.current) router.push(`/posts/${tag}`);
          });
        });

        // 그림자 적용
        current.insertAdjacentHTML("afterbegin", shadowFilter);
        ["rect", "circle"].forEach((shape) => {
          current.querySelectorAll(shape).forEach((element) => {
            element.setAttribute("filter", `url(#drop-shadow)`);
          });
        });
        current.viewBox.baseVal.x -= 8;
        current.viewBox.baseVal.y -= 8;
        current.viewBox.baseVal.width += 10;
        current.viewBox.baseVal.height += 10;

        // 스크롤 초기화
        const rootElement = current.querySelector(".root-tag");
        if (rootElement) {
          const [preCenter, rootCenter] = [ref.current, rootElement]
            .map((element) => element.getBoundingClientRect())
            .map((rect) => [
              rect.left + rect.width / 2,
              rect.top + rect.height / 2,
            ]);
          const [transX, transY] = [0, 1].map(
            (i) => rootCenter[i] - preCenter[i]
          );
          // 아래 분기문은 Next.js의 이중 호출에 의한 스크롤 초기화를 막기 위한 검사문임.
          if (ref.current.scrollLeft === 0 && ref.current.scrollTop === 0) {
            [ref.current.scrollLeft, ref.current.scrollTop] = [transX, transY];
            scrollPos.current = { left: transX, top: transY };
          }
        }
      });
  }, [root, tags, router]);

  return (
    <div
      className="w-full box-border p-[16px] flex flex-row justify-center max-md:px-0 max-md:py-[16px]"
      style={{ height: height || "fit-content" }}
    >
      <div className="max-w-screen-lg w-full flex flex-row justify-center items-center shadow-inner md:rounded">
        <div
          className="p-[16px] max-w-full max-h-full overflow-hidden select-none touch-none cursor-grab"
          ref={ref}
          onTouchStart={(e) => onDragStart(e)}
          onMouseDown={(e) => onDragStart(e)}
          onTouchMove={(e) => onDrag(e)}
          onMouseMove={(e) => onDrag(e)}
          onMouseUp={(e) => onDragEnd(e)}
          onTouchEnd={(e) => onDragEnd(e)}
          onMouseLeave={(e) => onDragEnd(e)}
          onTouchCancel={(e) => onDragEnd(e)}
        >
          <div className="flex flex-row justify-center items-center gap-[10px]">
            <FontAwesomeIcon icon={faSpinner} />
            태그 지도를 그리는 중..
          </div>
        </div>
      </div>
    </div>
  );
}
