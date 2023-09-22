import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function convertMarkdownToHTML(content: string): Promise<string> {
  // Use remark to convert markdown into HTML string
  // const processedContent = await remark().use(html).process("# Hello");
  const processedContent = await unified().use(remarkParse).use(remarkRehype).use(rehypeSanitize).use(rehypeStringify).process(content);
  const contentHTML = processedContent.toString();

  // Comiine the data with the id
  return contentHTML;
}

export function combineClasses(initial: string, upcoming?: string) {
  if (!initial) {
    throw new Error("Initial can't be falsy.");
  }

  if (!upcoming) {
    return initial;
  }

  return initial + " " + upcoming;
}
