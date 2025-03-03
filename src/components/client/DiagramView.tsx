"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const DiagramView = ({ script }: { script: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isRenderingStarted = useRef(false);

  useEffect(() => {
    const div = ref.current;
    if (!div || isRenderingStarted.current) return;
    isRenderingStarted.current = true;

    mermaid.render(
      `diagram-view-${Math.random().toString().slice(2)}`,
      script
    ).then(({ svg, bindFunctions }) => {
      div.innerHTML = svg;
      bindFunctions?.(div);
    });
  }, [script]);

  return (
    <div 
      ref={ref}
      className="flex flex-row justify-center items-center"
    >
      <div className="flex flex-row justify-center items-center gap-[10px]">
        <FontAwesomeIcon icon={faSpinner}/>
        다이어그램을 그리는 중..
      </div>
    </div>
  );
};

export default DiagramView;