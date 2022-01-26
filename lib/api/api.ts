import fetch from "node-fetch";
import { filterTags } from "../filterTags";
import { RepositoryResponse, Tag, TagsResponse } from "./types";

const API_BASE_URL = "https://hub.docker.com";
const API_VERSION = "v2";

const TAGS_PAGE_DEFAULT = 1;
const TAGS_PER_PAGE_DEFAULT = 100;

const makeGetRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
  });

  return response.json() as Promise<T>;
};

const buildUrl = (path: string): string => {
  return `${API_BASE_URL}/${API_VERSION}/${path}`;
};

const getRepository = async (
  username: string,
  repository: string
): Promise<RepositoryResponse> => {
  const requestUrl = buildUrl(`repositories/${username}/${repository}`);

  return makeGetRequest<RepositoryResponse>(requestUrl);
};

const getTags = async (
  username: string,
  repository: string,
  page: number = TAGS_PAGE_DEFAULT,
  perPage: number = TAGS_PER_PAGE_DEFAULT
): Promise<TagsResponse> => {
  const requestUrl = buildUrl(
    `repositories/${username}/${repository}/tags?page_size=${perPage}&page=${page}`
  );
  return makeGetRequest<TagsResponse>(requestUrl);
};

const getAllTags = async (
  username: string,
  repository: string
): Promise<Tag[]> => {
  const firstResponse = await getTags(username, repository, TAGS_PAGE_DEFAULT);
  const pagedResponses: TagsResponse[] = [];

  if (firstResponse.count > TAGS_PER_PAGE_DEFAULT) {
    const jobs: Promise<TagsResponse>[] = [];
    const pages = Math.ceil(firstResponse.count / TAGS_PER_PAGE_DEFAULT);
    for (let i = TAGS_PAGE_DEFAULT + 1; i <= pages; i++) {
      jobs.push(getTags(username, repository, i));
    }

    pagedResponses.push(...(await Promise.all(jobs)));
  }

  const mergedTags = [
    ...firstResponse.results,
    ...pagedResponses.flatMap((x) => x.results),
  ];

  return mergedTags;
};

const getFilteredTags = async (
  username: string,
  repository: string,
  include: string[],
  exclude: string[],
  includeRegex: string,
  excludeRegex: string
) => {
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
};

export {
  getFilteredTags,
  getAllTags,
  getTags,
  getRepository,
  API_BASE_URL,
  API_VERSION,
};
