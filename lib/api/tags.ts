import {
  TAGS_PAGE_DEFAULT,
  TAGS_PER_PAGE_DEFAULT,
  buildUrl,
  makeGetRequest,
} from "./base";
import { Tag, TagsResponse } from "./types";

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
  ].sort((a: Tag, b: Tag): number => {
    if (a.name === "latest") return -1;
    if (b.name === "latest") return 1;

    return (
      new Date(b.tag_last_pushed).getTime() -
      new Date(a.tag_last_pushed).getTime()
    );
  });

  return mergedTags;
};

export { getTags, getAllTags };
