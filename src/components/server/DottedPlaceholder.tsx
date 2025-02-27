import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export type DottedPlaceholderProp = {
  icon: IconDefinition;
  text: string;
  style?: React.CSSProperties;
}

const DottedPlaceholder = (prop: DottedPlaceholderProp) => (
  <div className="w-full p-[16px] flex flex-row justify-center">
    <div
      className="max-w-screen-lg w-full border-dotted border-[3px] border-[#aaaaaa] rounded p-[16px] box-border flex flex-col justify-center items-center gap-[16px] opacity-80"
      style={prop.style}
    >
      <FontAwesomeIcon icon={prop.icon} className="w-[100px] h-[100px]"/>
      <p className="text-[1.2rem]">{prop.text}</p>
    </div>
  </div>
);

export default DottedPlaceholder;