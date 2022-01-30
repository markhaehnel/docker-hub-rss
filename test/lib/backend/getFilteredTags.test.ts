import { getFilteredTags } from "../../../src/lib/backend/getFilteredTags";
import * as tags from "../../../src/lib/backend/api/tags";
import * as repository from "../../../src/lib/backend/api/repository";
import * as filterTags from "../../../src/lib/backend/filterTags";
import { getMockTags } from "./__mocks__/mockTag";
import { mockRepositoryResponse } from "./__mocks__/mockRepositoryResponse";

describe("getFilteredTags", () => {
  beforeEach(() => {
    // @ts-ignore
    tags.getAllTags = jest.fn(() => getMockTags());
    // @ts-ignore
    repository.getRepository = jest.fn(() => mockRepositoryResponse);
    // @ts-ignore
    filterTags.filterTags = jest.fn(filterTags.filterTags);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  test("should fetch repository and tags and return filtered response", async () => {
    const actualValue = await getFilteredTags(
      "library",
      "mongo",
      [],
      [],
      "v2.*",
      ""
    );

    expect(repository.getRepository).toHaveBeenCalledWith("library", "mongo");
    expect(tags.getAllTags).toHaveBeenCalledWith("library", "mongo");
    expect(filterTags.filterTags).toHaveBeenCalledWith(
      getMockTags(),
      [],
      [],
      "v2.*",
      ""
    );
    expect(actualValue.repo).toStrictEqual(mockRepositoryResponse);
    expect(actualValue.tags).toStrictEqual(getMockTags().slice(2, 10));
  });
});
