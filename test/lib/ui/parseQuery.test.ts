import { parseQuery } from "../../../src/lib/ui/parseQuery";

describe("parseQuery", () => {
  test("should return valid params given list of filters", () => {
    const actualValue = parseQuery({
      username: "prom",
      repository: "prometheus",
      include: "latest,master",
      exclude: "dev,test",
      includeRegex: ".*",
      excludeRegex: ".*-dev",
    });

    const expectedValue = {
      username: "prom",
      repository: "prometheus",
      include: ["latest", "master"],
      exclude: ["dev", "test"],
      includeRegex: ".*",
      excludeRegex: ".*-dev",
    };

    expect(actualValue).toStrictEqual(expectedValue);
  });

  test("should return valid params given single string of filters", () => {
    const actualValue = parseQuery({
      username: "prom",
      repository: "prometheus",
      include: "latest",
      exclude: "test",
      includeRegex: ".*",
      excludeRegex: ".*-dev",
    });

    const expectedValue = {
      username: "prom",
      repository: "prometheus",
      include: ["latest"],
      exclude: ["test"],
      includeRegex: ".*",
      excludeRegex: ".*-dev",
    };

    expect(actualValue).toStrictEqual(expectedValue);
  });

  test("should return valid params given no filters", () => {
    const actualValue = parseQuery({
      username: "prom",
      repository: "prometheus",
    });

    const expectedValue = {
      username: "prom",
      repository: "prometheus",
      include: [],
      exclude: [],
      includeRegex: undefined,
      excludeRegex: undefined,
    };

    expect(actualValue).toStrictEqual(expectedValue);
  });
});
