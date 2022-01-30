import { filterTags } from "../../../src/lib/backend/filterTags";
import { getMockTags } from "./__mocks__/mockTag";

describe("filterTags", () => {
  test("should return empty array when given no tags and empty filters", () => {
    const result = filterTags([], [], [], "", "");

    expect(result).toStrictEqual([]);
  });

  test("should return all tags when given empty filters", () => {
    const input = getMockTags();
    const actualValue = filterTags(input, [], [], "", "");

    expect(actualValue).toStrictEqual(input);
  });

  test("should return all tags when given 'include' filter", () => {
    const input = getMockTags();
    const actualValue = filterTags(input, ["latest", "v1.6.0-rc2"], [], "", "");

    const expectedValue = [input[0], input[11]];

    expect(actualValue).toStrictEqual(expectedValue);
  });

  test("should return all tags when given 'exclude' filter", () => {
    const input = getMockTags();
    const actualValue = filterTags(input, [], ["dev", "v2.5.0"], "", "");

    const expectedValue = [...input];
    expectedValue.splice(8, 1);
    expectedValue.splice(1, 1);

    expect(actualValue).toStrictEqual(expectedValue);
  });

  test("should return all tags when given 'includeRegex' filter", () => {
    const input = getMockTags();
    const actualValue = filterTags(input, [], [], "v2.5.*", "");

    const expectedValue = input.slice(4, 10);

    expect(actualValue).toStrictEqual(expectedValue);
  });

  test("should return all tags when given 'excludeRegex' filter", () => {
    const input = getMockTags();
    const actualValue = filterTags(input, [], [], "", "-windowsservercore");

    const expectedValue = [...input];
    expectedValue.splice(9, 1);
    expectedValue.splice(7, 1);
    expectedValue.splice(5, 1);
    expectedValue.splice(3, 1);

    expect(actualValue).toStrictEqual(expectedValue);
  });

  test("should return all tags when given 'includeRegex' and 'excludeRegex' filter", () => {
    const input = getMockTags();
    const actualValue = filterTags(
      input,
      [],
      [],
      "v2.5.*",
      ".*-windowsservercore"
    );

    const expectedValue = [input[4], input[6], input[8]];

    expect(actualValue).toStrictEqual(expectedValue);
  });

  test("should return all tags when given ‘exclude', 'includeRegex' and 'excludeRegex' filter", () => {
    const input = getMockTags();
    const actualValue = filterTags(
      input,
      [],
      ["v2.5.1"],
      "v2.5.*",
      ".*-windowsservercore"
    );

    const expectedValue = [input[4], input[8]];

    expect(actualValue).toStrictEqual(expectedValue);
  });
});
