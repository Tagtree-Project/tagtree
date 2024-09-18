"use client";

import { useRouter } from "next/navigation";

export default function RouterButton({
  url,
  className,
  text,
}: {
  url: string;
  className: string;
  text: string;
}) {
  const router = useRouter();

  return (
    <button onClick={() => router.push(url)} className={className}>
      {text}
    </button>
  );
}
