import { appName, appNameKorean } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import icon from "@/resources/icons/safari-pinned-tab.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function Button({ children }: { children: JSX.Element[] }) {
  return (
    <div className="m-[5px] h-[fit-content] p-[10px] bg-transparent border-[none] rounded flex flex-row items-center gap-[10px] shadow">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-row justify-center">
      <div className="max-w-screen-lg box-border p-[16px] flex flex-col items-center gap-[16px]">
        <Image
          src={icon}
          width={200}
          height={200}
          alt="site-icon"
          className="select-none animate-[upFadeIn_0.5s_linear]"
        />
        <h1 className="w-[fit-content] text-[2rem] font-bold flex flex-row items-baseline justify-center gap-[10px]">
          {"#" + appNameKorean}
          <sub className="text-[0.5em] opacity-50">{appName.toLowerCase()}</sub>
        </h1>
        <div className="opacity-80">Algorithm Problem Solving with BOJ Tag</div>
        <p className="text-center [word-break:keep-all]">
          {appNameKorean}는 문제 해결에 쓰이는 알고리즘을{" "}
          <a href="https://www.acmicpc.net/" target="blank">
            백준
          </a>{" "}
          태그를 중심으로 정리한 블로그입니다.
        </p>
        <div className="p-[16px] flex flex-row justify-center gap-[50px]">
          <Button>
            <FontAwesomeIcon icon={faLink} />
            <Link href="/tags">Tags</Link>
          </Button>
          <Button>
            <FontAwesomeIcon icon={faLink} />
            <Link href="/posts">Posts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
