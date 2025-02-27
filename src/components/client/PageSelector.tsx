"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAngleLeft,
  faAnglesRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Button = ({
  onClick,
  isSmall = true,
  isSelected = false,
  children,
}: {
  onClick: () => void;
  isSmall?: boolean;
  isSelected?: boolean;
  children: React.ReactNode;
}) => (
  <button
    className={`border-[none] rounded bg-transparent flex flex-row justify-center items-center shadow`}
    onClick={onClick}
    style={{
      ...(isSmall
        ? { width: "40px", height: "40px" }
        : { width: "50px", height: "50px" }),
      ...(isSelected ? { backgroundColor: "#FF7B72" } : {}),
    }}
  >
    {children}
  </button>
);

export type PageSelectorProp = {
  pageCount: number,
  showingPageCount: number,
  currentPage: number,
  baseUrl: string,
}

const PageSelector = (prop: PageSelectorProp) => {
  const router = useRouter();
  const basePage = Math.floor(prop.currentPage / prop.showingPageCount) * prop.showingPageCount;

  const onButtonClicked: (page: number) => void = useCallback(
    (page) => {
      const routingPage = Math.max(0, Math.min(prop.pageCount - 1, page))
      if (routingPage !== prop.currentPage) router.push(prop.baseUrl + `?page=${routingPage}`);
    },
    [router, prop.currentPage, prop.baseUrl, prop.pageCount]
  );

  return (
    <div className="flex flex-row items-center gap-[16px] p-[16px]">
      <Button onClick={() => onButtonClicked(0)}>
        <FontAwesomeIcon icon={faAnglesLeft}/>
      </Button>
      <Button onClick={() => onButtonClicked(basePage - 1)}>
        <FontAwesomeIcon icon={faAngleLeft}/>
      </Button>
      {Array.from({ length: Math.min(prop.showingPageCount, prop.pageCount - basePage) }, (_, i) => {
        const current = basePage + i;

        return (
          <Button
            key={current}
            isSmall={false}
            isSelected={current === prop.currentPage}
            onClick={() => onButtonClicked(current)}
          >
            {`${current + 1}`}
          </Button>
        );
      })}
      <Button onClick={() => onButtonClicked(basePage + prop.showingPageCount)}>
        <FontAwesomeIcon icon={faAngleRight}/>
      </Button>
      <Button onClick={() => onButtonClicked(prop.pageCount - 1)}>
        <FontAwesomeIcon icon={faAnglesRight}/>
      </Button>
    </div>
  );
};

export default PageSelector;
