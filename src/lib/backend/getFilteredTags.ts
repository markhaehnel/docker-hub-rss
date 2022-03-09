import { getRepository } from "./api/repository";
import { getAllTags } from "./api/tags";
import { RepositoryResponse, Tag } from "./api/types";
import { HttpError } from "../shared/error";
import { filterTags } from "./filterTags";

const getFilteredTags = async (
  username: string,
  repository: string,
  include: string[],
  exclude: string[],
  includeRegex: string,
  excludeRegex: string
): Promise<{ repo: RepositoryResponse; tags: Tag[] }> => {
  try {
    const [repo, tags] = await Promise.all([
      getRepository(username, repository),
      getAllTags(username, repository),
    ]);

    const filteredTags = filterTags(
      tags,
      include,
      exclude,
      includeRegex,
      excludeRegex
    );

    return { repo, tags: filteredTags };
  } catch (error: any) {
    if (error instanceof HttpError && error.statusCode === 404) {
      throw new HttpError(
        "User or repository not found",
        404,
        error.internalMessage || error.message
      );
    }

    throw error;
  }
};
export { getFilteredTags };
