import remarkHtml, { type Options } from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

export function matchText(text: string, regex: RegExp): boolean {
  return new RegExp(regex, "g").test(text);
}

export async function convertMarkdownToHTML(content: string): Promise<string> {
  const remarkHtmlConfig: Options = {
    sanitize: false
  };

  // const processedContent = await unified().use(remarkParse).use(remarkRehype).use(rehypeSanitize).use(rehypeStringify).process(content);
  const processedContent = await unified()
    .use(remarkParse)
    /* @ts-ignore */
    .use(remarkHtml, remarkHtmlConfig)
    .process(content);
  const contentHTML = processedContent.toString();
  return contentHTML;
}

export function combineClasses(initial: string, ...upcoming: string[]): string {
  if (!initial) {
    throw new Error("Initial can't be falsy.");
  }

  /* If the first element of upcoming is empty string, then assume that there's no upcoming style. */
  if (!upcoming[0]) {
    return initial;
  }

  let combined = initial;
  upcoming.forEach((style) => (combined += " " + style));

  return combined;
}
