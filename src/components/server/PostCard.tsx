import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";

const IconSpan = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[0.8em] flex flex-row items-center gap-[5px]">
    {children}
  </span>
);

export type PostCardProp = {
  title: string | null,
  subtitle: string | null,
  date: Date | null,
  writer: string | null,
  postUrl: string,
}

const PostCard = (props: PostCardProp) => (
  <Link href={props.postUrl}>
    <div
      className="w-full box-border rounded-[16px] p-[16px] flex flex-col gap-[10px] [transition:0.2s] shadow hover:bg-brand">
      <h1 className="m-0 p-0 text-[1.2em]">{props.title}</h1>
      <h2 className="m-0 p-0 text-[1em] font-light">{props.subtitle}</h2>
      <div className="flex flex-row gap-[10px]">
        {props.date ? (
          <IconSpan>
            <FontAwesomeIcon icon={faCalendar}/>
            <span>{props.date.toDateString()}</span>
          </IconSpan>
        ) : null}
        {props.writer ? (
          <IconSpan>
            <FontAwesomeIcon icon={faPen}/>
            <span>{props.writer}</span>
          </IconSpan>
        ) : null}
      </div>
    </div>
  </Link>
);

export default PostCard;