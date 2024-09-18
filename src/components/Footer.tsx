import { appName } from "@/constants";

export default function Footer() {
  return (
    <footer
      id={`${appName}-footer`}
      className="px-[64px] py-[16px] [transition:0.3s] flex flex-row justify-center items-center max-lg:p-[16px]"
    >
      <div className="w-full h-[64px] px-[16px] max-w-screen-lg flex flex-row items-center">
        <p>
          Powered by <a href="https://github.com/CHOYUNSIG">CHOYUNSIG</a>
        </p>
      </div>
    </footer>
  );
}
