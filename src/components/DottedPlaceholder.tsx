import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DottedPlaceholder({
  icon,
  text,
  style,
}: {
  icon: IconDefinition;
  text: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="w-full p-[16px] flex flex-row justify-center">
      <div
        className="max-w-screen-lg w-full border-dotted border-[3px] border-[#aaaaaa] rounded p-[16px] box-border flex flex-col justify-center items-center gap-[16px] opacity-80"
        style={style}
      >
        <FontAwesomeIcon icon={icon} className="w-[100px] h-[100px]" />
        <p className="text-[1.2rem]">{text}</p>
      </div>
    </div>
  );
}
