/* Core */
import { useState, type FormEventHandler, useEffect, useRef, type MouseEventHandler } from "react";

/* Custom Components */
import { FixedTextArea } from "@/components";

/* Style */
import Style from "./index.module.css";
import { BoldIcon, H1Icon, H2Icon, ItalicIcon } from "@/public/icons";

/* Others */
import { combineClasses, convertMarkdownToHTML, matchText } from "@/utils/utils";
import { welcome } from "@/constants/welcome";
import { TFormatButton } from "@/common/types";
import { applyFormat } from "@/helpers/formatHelpers";
import IconButton from "@/components/IconButton";
import { MarkdownPatterns } from "@/constants/regexes";

type TSelectionData = Array<number>;

export default function Home() {
  const [markdownValue, setMarkdownValue] = useState<string>(welcome);
  const [htmlValue, setHTMLValue] = useState<string>("");
  const [selectionState, setSelectionState] = useState<TSelectionData>([0, 0]); /* [selectionStart, selectionEnd] */
  const [activeText, setActiveText] = useState<string>("");
  const [activeFormatType, setActiveFormatType] = useState<TFormatButton | null>(null);
  const fixedTextAreaRef = useRef();

  useEffect(() => {
    convertMarkdownToHTML(markdownValue).then((data) => setHTMLValue(data));
    trackUserTextSelection(); // To prevent loss of text selection on editor
  }, [markdownValue]);

  const getSelectionData = (): TSelectionData => {
    // @ts-ignore: ref
    const selectionStart: number = fixedTextAreaRef.current.selectionStart;
    // @ts-ignore: ref
    const selectionEnd: number = fixedTextAreaRef.current.selectionEnd;

    return [selectionStart, selectionEnd];
  };

  const updateTextSelection = (newSelectionStart: number, newSelectionEnd: number): void => {
    /* @ts-ignore: ref */
    fixedTextAreaRef.current.selectionStart = newSelectionStart;
    /* @ts-ignore: ref */
    fixedTextAreaRef.current.selectionEnd = newSelectionEnd;
  };

  const trackUserTextSelection = (): void => {
    // const selectedText: string = window.getSelection()?.toString() ?? "";
    const [previousSelectionStart, previousSelectionEnd] = selectionState;
    let nextSelectionStart: number = previousSelectionStart,
      nextSelectionEnd: number = previousSelectionStart;

    console.log("[trackUserTextSelection] Selected Text: " + activeText);

    switch (activeFormatType) {
      case "bold":
        if (matchText(activeText, MarkdownPatterns.bold)) {
          nextSelectionStart = previousSelectionStart;
          nextSelectionEnd = previousSelectionEnd - 4;
          updateTextSelection(nextSelectionStart, nextSelectionEnd);
        } else {
          /* Formatted text starts from the beginning of the pure text */
          nextSelectionStart = previousSelectionStart;
          /* For bold, formatted text starts with 2 asterisks and ends with 2 asterisks */
          nextSelectionEnd = 2 + previousSelectionEnd + 2;
          updateTextSelection(nextSelectionStart, nextSelectionEnd);
        }
        break;
      case "italic":
        break;
      default:
        break;
    }
  };

  const onChangeMarkdownValue: FormEventHandler<HTMLTextAreaElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log("[onChangeMarkdownValue]");
    setMarkdownValue(event.target.value);
  };

  const handleClickOnFormatIcon = (formatType: TFormatButton) => {
    console.log("[handeClickOnFormatIcon]");
    const selectionData: TSelectionData = getSelectionData();
    // This is more safe way to track active text instead of extracting it by range since it's updated by changes.
    // And, it should not be called in trackUserTextSelection() function since it's dependent to markdownValue.
    // Because, in every change cursor and selection goes to the end.
    const selectedText: string = window.getSelection()?.toString() || "";
    const updatedText: string = applyFormat(markdownValue, formatType, selectionData);
    setSelectionState(selectionData); /* To keep the old selection state before formatting */
    setActiveText(selectedText);
    setMarkdownValue(updatedText);
    setActiveFormatType(formatType);
  };

  const onMouseDown: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault(); // To prevent loss of focus to text editor
  };

  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <div className={Style.formatIcons}>
          {/* TODO: Add cursor on mouseover */}
          <IconButton
            buttonProps={{
              onClick: () => handleClickOnFormatIcon("bold"),
              onMouseDown
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
