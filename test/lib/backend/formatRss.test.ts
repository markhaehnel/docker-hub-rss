import { formatRss } from "../../../src/lib/backend/formatRss";
import { mockRepositoryResponse } from "./__mocks__/mockRepositoryResponse";
import { getMockTags } from "./__mocks__/mockTag";
import {
  rssXmlData,
  rssXmlDataEmpty,
} from "./__mocks__/expectedData/rssXmlData";

describe("formatRss", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(Date.UTC(2022, 1, 31, 12, 30, 45, 0));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should return valid RSS feed xml when given tags", () => {
    const actualValue = formatRss(mockRepositoryResponse, getMockTags());

    expect(actualValue).toBe(rssXmlData);
  });

  test("should return valid RSS feed xml when given no tags", () => {
    const actualValue = formatRss(mockRepositoryResponse, []);

    expect(actualValue).toBe(rssXmlDataEmpty);
  });
});
