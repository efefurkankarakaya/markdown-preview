import { Html, Head, Main, NextScript } from "next/document";

const AppName: string = "Markdown Preview";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{AppName}</title>
        <link rel="icon" href="next-favicon.ico" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
