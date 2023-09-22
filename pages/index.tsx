import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { FixedTextArea } from "@/components";
import Style from "./index.module.css";
import { type EventHandler, useState, FormEventHandler, useEffect } from "react";
import { combineClasses, convertMarkdownToHTML } from "@/utils/utils";

const inter = Inter({ subsets: ["latin"] });

/**
 * TODO:
 * Dockerfile
 * Tests (with Cypress, e2e and unit)
 * Workflow (run tests every commit)
 * Save / download or Copy
 * Set data to the cookies
 */
export default function Home() {
  const [markdownValue, setMarkdownValue] = useState<string>("");
  const [htmlValue, setHTMLValue] = useState<string>("");

  const onChangeMarkdownValue: FormEventHandler<HTMLTextAreaElement> = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
    setMarkdownValue(event.target.value);
  };

  useEffect(() => {
    convertMarkdownToHTML(markdownValue).then((data) => setHTMLValue(data));
  }, [markdownValue]);

  return (
    <div className={Style.container}>
      <div className={Style.innerContainer}>
        <FixedTextArea
          extraClassName={combineClasses(Style.outputArea, Style.padding, Style.margin, Style.border)}
          textAreaProps={{
            onChange: onChangeMarkdownValue,
            value: markdownValue,
            // rows: 20,
          }}
        />
        <div
          className={combineClasses(Style.outputArea, Style.padding, Style.margin, Style.border)}
          dangerouslySetInnerHTML={{ __html: htmlValue }}
        />
      </div>
    </div>
  );
}
