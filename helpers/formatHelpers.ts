import { TFormatButton } from "@/common/types";
import { matchText } from "@/utils/utils";

export function applyFormat(markdownValue: string, formatType: TFormatButton, selectionData: Array<number>): string {
  const [selectionStart, selectionEnd] = selectionData;
  const firstPart: string = markdownValue.substring(0, selectionStart);
  const secondPart: string = markdownValue.substring(selectionEnd, markdownValue.length);

  const data = markdownValue.substring(selectionStart, selectionEnd);
  const formattedText = formatText(data, formatType);

  /* TODO: Consider window.getSelection here to get the actual string data, it seems more performant. */
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection

  const complete = firstPart + formattedText + secondPart;

  return complete;
}

export function formatText(text: string, formatType: TFormatButton): string {
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
}
