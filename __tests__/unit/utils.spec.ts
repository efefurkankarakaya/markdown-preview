import { combineClasses, convertMarkdownToHTML } from "@/utils/utils";

jest.setTimeout(30000);

const TestData = {
  convertMarkdownToHTML: {
    text: "This text is pure.",
  },
  combineClasses: {
    singleClass: {
      initial: "container",
      upcoming: "blue",
    },
    multipleClass: {
      initial: "wrapper row",
      upcoming: "darkblue grey-border soft-corner",
    },
  },
};

/* combineClasses() */
test("combineClasses(): Combine 2 classes", async () => {
  const expected = "container blue";
  const actual = combineClasses(TestData.combineClasses.singleClass.initial, TestData.combineClasses.singleClass.upcoming);
  expect(actual).toEqual(expected);
});

test("combineClasses(): Combine single initial class with multiple upcoming classes", async () => {
  const expected = "container darkblue grey-border soft-corner";
  const actual = combineClasses(TestData.combineClasses.singleClass.initial, TestData.combineClasses.multipleClass.upcoming);
  expect(actual).toEqual(expected);
});

test("combineClasses(): Combine multiple initial classes with single upcoming class", async () => {
  const expected = "wrapper row blue";
  const actual = combineClasses(TestData.combineClasses.multipleClass.initial, TestData.combineClasses.singleClass.upcoming);
  expect(actual).toEqual(expected);
});

test("combineClasses(): Combine multiple initial classes with multiple upcoming class", async () => {
  const expected = "wrapper row darkblue grey-border soft-corner";
  const actual = combineClasses(TestData.combineClasses.multipleClass.initial, TestData.combineClasses.multipleClass.upcoming);
  expect(actual).toEqual(expected);
});

/* convertMarkdownToHTML() */
test("convertMarkdownToHTML(): Convert a text to paragraph", async () => {
  const data = TestData.convertMarkdownToHTML.text;
  const expected = `<p>${data}</p>\n`; /* Converted elements end with \n */
  const actual = await convertMarkdownToHTML(data);
  expect(actual).toEqual(expected);
});

test("convertMarkdownToHTML(): Convert a text to header", async () => {
  const data = `# ${TestData.convertMarkdownToHTML.text}`;
  const expected = `<h1>${TestData.convertMarkdownToHTML.text}</h1>\n`;
  const actual = await convertMarkdownToHTML(data);
  expect(actual).toEqual(expected);
});

test("convertMarkdownToHTML(): Convert a text to a paragraph with a line break", async () => {
  const data = `${TestData.convertMarkdownToHTML.text} <br />`;
  const expected = `<p>${data}</p>\n`;
  const actual = await convertMarkdownToHTML(data);
  expect(actual).toEqual(expected);
});

test("convertMarkdownToHTML(): Convert a code with a line break", async () => {
  const data = `\`${TestData.convertMarkdownToHTML.text}\` <br />`;
  const expected = `<p><code>${TestData.convertMarkdownToHTML.text}</code> <br /></p>\n`;
  const actual = await convertMarkdownToHTML(data);
  expect(actual).toEqual(expected);
});
