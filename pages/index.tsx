/* Core */
import { useState, type FormEventHandler, useEffect, useRef } from "react";
import Image from "next/image";
/* Custom Components */
import { FixedTextArea } from "@/components";
import TransparentButton from "@/components/TransparentButton";

/* Style */
import Style from "./index.module.css";
import BoldIcon from "@/public/icons/bold.svg";
import ItalicIcon from "@/public/icons/italic.svg";

/* Others */
import {
  combineClasses,
  convertMarkdownToHTML,
  matchText
} from "@/utils/utils";
import { welcome } from "@/constants/welcome";

type THeader = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TFormatButton = "bold" | "italic" | "link" | THeader;

export default function Home() {
  const [markdownValue, setMarkdownValue] = useState<string>(welcome);
  const [htmlValue, setHTMLValue] = useState<string>("");
  const fixedTextAreaRef = useRef();

  useEffect(() => {
    convertMarkdownToHTML(markdownValue).then((data) => setHTMLValue(data));
  }, [markdownValue]);

  const onChangeMarkdownValue: FormEventHandler<HTMLTextAreaElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMarkdownValue(event.target.value);
  };

  const getSelectionData = (): Array<number> => {
    // @ts-ignore: Ref
    const selectionStart: number = fixedTextAreaRef.current.selectionStart;
    // @ts-ignore: Ref
    const selectionEnd: number = fixedTextAreaRef.current.selectionEnd;

    console.log(markdownValue.substring(selectionStart, selectionEnd));

    return [selectionStart, selectionEnd];
  };

  const formatText = (text: string, formatType: TFormatButton): string => {
    let processedText: string = "";
    console.log(text);

    // TODO: If user wants to select and remove the current format, then user won't select the whole text and prefixes & postfixes will still be there.

    /**
     * Header: Symbol + Whitespace + Text
     * Bold / Italic / : Symbol + Text
     * Blockquote (single line): Symbol + Whitespace + Text
     * Blockquote (multiple): Symbol + Whitespace + Text + Line Break + Symbol + Whitespace + ..
     * Nested Blockquotes: No support for first
     * Ordered List: Symbol + Whitespace + Text
     * Unordered List: Symbol + Whitespace + Text
     * Code Lines: ` + Text + `
     * Code Block: ```+ Text + ```
     * Horizontal Rule: ---
     * Line Break?
     * Will you support the same for Image, URL? It can be disaster, specially for image.. URL is fine.
     */
    switch (formatType) {
      case "bold":
        const boldTextPattern = /\*\*(.*?)\*\*/;
        if (matchText(text, boldTextPattern)) {
          processedText = text.replaceAll("**", "");
        } else {
          processedText = "**" + text + "**";
        }
        console.log("Bold");
      case "italic":
        console.log("Italic");
      case "link":
        console.log("Link");
      // case "header":
      //   // TODO: Open a dropdown list that shows header types
      //   console.log("Header (?)");
      // case "unordered-list":
      //   console.log("Unordered List");
      // case "ordered-list":
      //   console.log("Ordered List");
      default:
        break;
    }

    return processedText;
  };

  /* TODO: This will probably require format type*/
  const applyFormat = (formatType: TFormatButton) => {
    const [selectionStart, selectionEnd] = getSelectionData();
    const firstPart: string = markdownValue.substring(0, selectionStart);
    const secondPart: string = markdownValue.substring(
      selectionEnd,
      markdownValue.length
    );

    const data = markdownValue.substring(selectionStart, selectionEnd);

    // TODO: There should be a function that returns the formatted text.
    const formattedText = formatText(data, formatType);

    /* TODO: Consider window.getSelection here to get the actual string data, it seems more performant. */
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection

    // applyFormat()
    const complete = firstPart + formattedText + secondPart;

    // TODO: Should I consider move this out?
    setMarkdownValue(complete);
  };

  const handleClickOnFormatIcon = (formatType: TFormatButton) => {
    applyFormat(formatType);
  };

  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <div className={Style.formatIcons}>
          {/* TODO: These are repetitive components, you can create custom ones for these icons. */}
          <TransparentButton onClick={() => handleClickOnFormatIcon("bold")}>
            <Image priority src={BoldIcon} alt="bold" />
          </TransparentButton>
          <TransparentButton onClick={() => handleClickOnFormatIcon("italic")}>
            <Image priority src={ItalicIcon} alt="bold" />
          </TransparentButton>
        </div>
        <div className={Style.editorContainer}>
          <FixedTextArea
            extraClassName={combineClasses(
              Style.textArea,
              Style.padding,
              Style.margin,
              Style.border
            )}
            textAreaProps={{
              ref: fixedTextAreaRef,
              onChange: onChangeMarkdownValue,
              value: markdownValue
              // rows: 20,
            }}
          />
          <div
            className={combineClasses(
              Style.outputArea,
              Style.padding,
              Style.margin,
              Style.border
            )}
            dangerouslySetInnerHTML={{ __html: htmlValue }}
            id="outputField"
          />
        </div>
      </div>
    </div>
  );
}
