/* Core */
import { useState, type FormEventHandler, useEffect, useRef } from "react";

/* Custom Components */
import { FixedTextArea } from "@/components";

/* Style */
import Style from "./index.module.css";
import { BoldIcon, H1Icon, H2Icon, ItalicIcon } from "@/public/icons";

/* Others */
import { combineClasses, convertMarkdownToHTML } from "@/utils/utils";
import { welcome } from "@/constants/welcome";
import { TFormatButton } from "@/common/types";
import { applyFormat } from "@/helpers/formatHelpers";
import IconButton from "@/components/IconButton";

export default function Home() {
  const [markdownValue, setMarkdownValue] = useState<string>(welcome);
  const [htmlValue, setHTMLValue] = useState<string>("");
  const [selectionState, setSelectionState] = useState<Array<number>>([0, 0]); /* [selectionStart, selectionEnd] */
  const fixedTextAreaRef = useRef();

  useEffect(() => {
    convertMarkdownToHTML(markdownValue).then((data) => setHTMLValue(data));
    /* Formatted text starts from the beginning of the pure text */
    /* @ts-ignore: ref */
    fixedTextAreaRef.current.selectionStart = selectionState[0];
    /* For bold, formatted text starts with 2 asterisks and ends with 2 asterisks */
    /* TODO: This should be refactored with a generic approach. */
    /* @ts-ignore: ref */
    fixedTextAreaRef.current.selectionEnd = 2 + selectionState[1] + 2;
  }, [markdownValue]);

  const onChangeMarkdownValue: FormEventHandler<HTMLTextAreaElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdownValue(event.target.value);
  };

  const getSelectionData = (): Array<number> => {
    // @ts-ignore: ref
    const selectionStart: number = fixedTextAreaRef.current.selectionStart;
    // @ts-ignore: ref
    const selectionEnd: number = fixedTextAreaRef.current.selectionEnd;

    return [selectionStart, selectionEnd];
  };

  const handleClickOnFormatIcon = (formatType: TFormatButton) => {
    const selectionData = getSelectionData();
    const updatedText = applyFormat(markdownValue, formatType, selectionData);
    setSelectionState(selectionData);
    setMarkdownValue(updatedText);
  };

  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <div className={Style.formatIcons}>
          {/* TODO: Add cursor on mouse */}
          <IconButton
            buttonProps={{
              onClick: () => handleClickOnFormatIcon("bold"),
              onMouseDown: (e) => e.preventDefault() // To prevent loss of focus to text editor
            }}
            imageProps={{
              src: BoldIcon,
              alt: "bold"
            }}
          />
          <IconButton
            buttonProps={{
              onClick: () => handleClickOnFormatIcon("italic")
            }}
            imageProps={{
              src: ItalicIcon,
              alt: "italic"
            }}
          />
          <IconButton
            buttonProps={{
              onClick: () => handleClickOnFormatIcon("h1")
            }}
            imageProps={{
              src: H1Icon,
              alt: "h1"
            }}
          />
          <IconButton
            buttonProps={{
              onClick: () => handleClickOnFormatIcon("h2")
            }}
            imageProps={{
              src: H2Icon,
              alt: "h2"
            }}
          />
        </div>
        <div className={Style.editorContainer}>
          <FixedTextArea
            extraClassName={combineClasses(Style.textArea, Style.padding, Style.margin, Style.border)}
            textAreaProps={{
              // @ts-ignore: ref
              ref: fixedTextAreaRef,
              onChange: onChangeMarkdownValue,
              value: markdownValue
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
    </div>
  );
}
