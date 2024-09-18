import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function IconSpan({ children }: { children: JSX.Element[] }) {
  return (
    <span className="text-[0.8em] flex flex-row items-center gap-[5px]">
      {children}
    </span>
  );
}

export interface PostCardProps {
  to: string;
  title: string | null;
  subtitle: string | null;
  date: string | null;
  writer: string | null;
}

export default function PostCard({
  to,
  title,
  subtitle,
  date,
  writer,
}: PostCardProps) {
  return (
    <Link href={to}>
      <div className="w-full box-border rounded-[16px] p-[16px] flex flex-col gap-[10px] [transition:0.2s] shadow hover:bg-brand">
        <h1 className="m-0 p-0 text-[1.2em]">{title}</h1>
        <h2 className="m-0 p-0 text-[1em] font-light">{subtitle}</h2>
        <div className="flex flex-row gap-[10px]">
          {date ? (
            <IconSpan>
              <FontAwesomeIcon icon={faCalendar} />
              <span>{date}</span>
            </IconSpan>
          ) : null}
          {writer ? (
            <IconSpan>
              <FontAwesomeIcon icon={faPen} />
              <span>{writer}</span>
            </IconSpan>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
