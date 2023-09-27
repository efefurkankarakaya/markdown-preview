import { combineClasses } from "@/utils/utils";

jest.setTimeout(30000);

const TestData = {
  singleClass: {
    initial: "container",
    upcoming: "blue",
  },
  multipleClass: {
    initial: "wrapper row",
    upcoming: "darkblue grey-border soft-corner",
  },
};

test("combineClasses(): Combine 2 classes", async () => {
  const expected = "container blue";
  const actual = combineClasses(TestData.singleClass.initial, TestData.singleClass.upcoming);
  expect(actual).toEqual(expected);
});

test("combineClasses(): Combine single initial class with multiple upcoming classes", async () => {
  const expected = "container darkblue grey-border soft-corner";
  const actual = combineClasses(TestData.singleClass.initial, TestData.multipleClass.upcoming);
  expect(actual).toEqual(expected);
});

test("combineClasses(): Combine multiple initial classes with single upcoming class", async () => {
  const expected = "wrapper row blue";
  const actual = combineClasses(TestData.multipleClass.initial, TestData.singleClass.upcoming);
  expect(actual).toEqual(expected);
});

test("combineClasses(): Combine multiple initial classes with multiple upcoming class", async () => {
  const expected = "wrapper row darkblue grey-border soft-corner";
  const actual = combineClasses(TestData.multipleClass.initial, TestData.multipleClass.upcoming);
  expect(actual).toEqual(expected);
});
