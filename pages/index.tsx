import { FixedTextArea } from "@/components";
import Style from "./index.module.css";
import { type EventHandler, useState, type FormEventHandler, useEffect } from "react";
import { combineClasses, convertMarkdownToHTML } from "@/utils/utils";
import { welcome } from "@/constants/welcome";

export default function Home() {
  const [markdownValue, setMarkdownValue] = useState<string>(welcome);
  const [htmlValue, setHTMLValue] = useState<string>("");

  const onChangeMarkdownValue: FormEventHandler<HTMLTextAreaElement> = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownValue(event.target.value);
  };

  useEffect(() => {
    convertMarkdownToHTML(markdownValue).then((data) => setHTMLValue(data));
  }, [markdownValue]);

  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <FixedTextArea
          extraClassName={combineClasses(Style.textArea, Style.padding, Style.margin, Style.border)}
          textAreaProps={{
            onChange: onChangeMarkdownValue,
            value: markdownValue,
            // rows: 20,
          }}
        />
        <div
          className={combineClasses(Style.outputArea, Style.padding, Style.margin, Style.border)}
          dangerouslySetInnerHTML={{ __html: htmlValue }}
          id="outputField"
        />
      </div>
    </div>
  );
}
