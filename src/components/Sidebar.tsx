"use client";

import Slugger from "github-slugger";
import { appName } from "../constants";
import { useEffect, useState } from "react";

export default function Sidebar({ markdown }: { markdown: string }) {
  const slugger = new Slugger();
  const [top, setTop] = useState(0);
  const [side, setSide] = useState<{ depth: number; header: string }[]>([]);

  useEffect(() => {
    let code = 0;
    const header: { depth: number; header: string }[] = [];
    markdown.split("\n").forEach((untrimed) => {
      const line = untrimed.trim();

      if (line.length >= 3 && line.substring(0, 3) === "```") {
        if (line.length > 3) code++;
        else code--;
      }

      if (!line.length || line[0] !== "#" || code > 0) return;

      let depth = 0;
      while (line[++depth] === "#") continue;
      header.push({ depth: depth, header: line.slice(depth).trim() });
    });

    setTop(
      (document.getElementById(`${appName}-header`)?.offsetHeight || 0) + 32
    );
    setSide(header);
  }, [markdown]);

  return (
    <div
      className="min-w-[200px] h-[fit-content] m-[32px] p-[16px] sticky rounded flex flex-col gap-[16px] shadow"
      style={{
        top: `${top}px`,
      }}
      id={`${appName}-sidebar`}
    >
      <h1 className="text-[1.2rem] font-bold">Index</h1>
      <div>
        {side.map(({ depth, header }) => {
          const slugForm = slugger.slug(header);
          return (
            <div
              key={slugForm}
              className="cursor-pointer pr-[16px]"
              style={{ paddingLeft: `${16 * (depth - 1)}px` }}
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.getElementById(slugForm);
                if (targetElement)
                  window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: "smooth",
                  });
              }}
            >
              {header}
            </div>
          );
        })}
      </div>
    </div>
  );
}
