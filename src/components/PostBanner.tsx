import { appName } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPen } from "@fortawesome/free-solid-svg-icons";

function IconSpan({ children }: { children: JSX.Element[] }) {
  return (
    <span className="flex flex-row items-center gap-[5px]">{children}</span>
  );
}

export interface PostBannerProps {
  title: string | null;
  subtitle: string | null;
  date: string | null;
  writer: string | null;
}

export default function PostBanner({
  title,
  subtitle,
  date,
  writer,
}: PostBannerProps) {
  return (
    <div
      className="flex flex-row justify-center py-[16px] break-all"
      id={`${appName}-banner`}
    >
      <div className="w-full py-[32px] max-w-screen-lg flex flex-col gap-[16px] [&>*]:px-[32px] [&>*]:overflow-x-auto ">
        <h1 className="text-[2.4rem] whitespace-nowrap">{title}</h1>
        <h2 className="text-[1.6rem] whitespace-nowrap font-light">{subtitle}</h2>
        <div className="flex flex-row gap-[20px]">
          {date && (
            <IconSpan>
              <FontAwesomeIcon icon={faCalendar} />
              <span>{date}</span>
            </IconSpan>
          )}
          {writer && (
            <IconSpan>
              <FontAwesomeIcon icon={faPen} />
              <span>{writer}</span>
            </IconSpan>
          )}
        </div>
      </div>
    </div>
  );
}
