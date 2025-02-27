import { appNameEnglish } from "@/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPen } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const IconSpan = ({ children }: { children: React.ReactNode }) => (
  <span className="flex flex-row items-center gap-[5px]">{children}</span>
);

export type PostBannerProp = {
  title: string | null;
  subtitle: string | null;
  date: Date | null;
  writer: string | null;
};

const PostBanner = (props: PostBannerProp) => (
  <div
    className="flex flex-row justify-center py-[16px] break-all"
    id={`${appNameEnglish}-banner`}
  >
    <div className="w-full py-[32px] max-w-screen-lg flex flex-col gap-[16px] [&>*]:px-[32px] [&>*]:overflow-x-auto ">
      <h1 className="text-[2.4rem] whitespace-nowrap">{props.title}</h1>
      <h2 className="text-[1.6rem] whitespace-nowrap font-light">{props.subtitle}</h2>
      <div className="flex flex-row gap-[20px]">
        {props.date && (
          <IconSpan>
            <FontAwesomeIcon icon={faCalendar}/>
            <span>{props.date.toDateString()}</span>
          </IconSpan>
        )}
        {props.writer && (
          <IconSpan>
            <FontAwesomeIcon icon={faPen}/>
            <span>{props.writer}</span>
          </IconSpan>
        )}
      </div>
    </div>
  </div>
);

export default PostBanner;
