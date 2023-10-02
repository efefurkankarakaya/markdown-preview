import type { HTMLProps } from "react";
import Style from "./index.module.css";
import { combineClasses } from "@/utils/utils";

interface FixedTextAreaProps {
  extraClassName?: HTMLProps<HTMLTextAreaElement>["className"];
  textAreaProps?: HTMLProps<HTMLTextAreaElement>;
}

const FixedTextArea: React.FC<FixedTextAreaProps> = (props): JSX.Element => {
  const { extraClassName = "", textAreaProps } = props;
  const combinedClasses = combineClasses(Style.textArea, extraClassName);

  return <textarea className={combinedClasses} {...textAreaProps} />;
};

export default FixedTextArea;
