"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAngleLeft,
  faAnglesRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

function Button({
  onClick,
  isSmall = true,
  isSelected = false,
  children,
}: {
  onClick: () => void;
  isSmall?: boolean;
  isSelected?: boolean;
  children: JSX.Element | string;
}) {
  return (
    <button
      className={`border-[none] rounded bg-transparent flex flex-row justify-center items-center shadow`}
      onClick={onClick}
      style={{
        ...(isSmall
          ? { width: "40px", height: "40px" }
          : { width: "50px", height: "50px" }),
        ...(isSelected ? { backgroundColor: "#ff7b72" } : {}),
      }}
    >
      {children}
    </button>
  );
}

export default function PageSelector({
  pageCount,
  page,
  chunk = 5,
  baseUrl,
}: {
  pageCount: number;
  page: number;
  chunk?: number;
  baseUrl: string;
}) {
  const router = useRouter();
  const onButtonClicked: (i: number) => void = useCallback(
    (pageNumber) =>
      router.push(
        baseUrl + `?page=${Math.max(0, Math.min(pageCount - 1, pageNumber))}`
      ),
    [router, baseUrl, pageCount]
  );

  const basePage = Math.floor(page / chunk) * chunk;

  return (
    <div className="flex flex-row items-center gap-[16px] p-[16px]">
      <Button onClick={() => onButtonClicked(0)}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </Button>
      <Button onClick={() => onButtonClicked(basePage - 1)}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>
      {Array.from({ length: Math.min(chunk, pageCount - basePage) }, (_, i) => {
        const current = basePage + i;
        return (
          <Button
            key={current}
            isSmall={false}
            isSelected={current === page}
            onClick={() => onButtonClicked(current)}
          >
            {`${current + 1}`}
          </Button>
        );
      })}
      <Button onClick={() => onButtonClicked(basePage + chunk)}>
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
      <Button onClick={() => onButtonClicked(pageCount - 1)}>
        <FontAwesomeIcon icon={faAnglesRight} />
      </Button>
    </div>
  );
}
