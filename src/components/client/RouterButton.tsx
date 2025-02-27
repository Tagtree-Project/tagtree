"use client";

import { useRouter } from "next/navigation";
import React from "react";

export type RouterButtonProp = {
  url: string,
  className?: string,
  text: string,
  style?: React.CSSProperties,
}

const RouterButton = (prop: RouterButtonProp) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(prop.url)}
      className={prop.className}
      style={prop.style}
    >
      {prop.text}
    </button>
  );
};

export default RouterButton;
