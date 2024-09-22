"use client";

import { useRouter } from "next/navigation";

export default function RouterButton({
  url,
  className,
  style,
  text,
}: {
  url: string;
  className?: string;
  style?: React.CSSProperties;
  text: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(url)}
      className={className}
      style={style}
    >
      {text}
    </button>
  );
}
