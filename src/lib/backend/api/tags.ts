import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { TAGS_PAGE_DEFAULT, TAGS_PER_PAGE_DEFAULT } from "./base";
import { makeGetRequest } from "./makeGetRequest";
import { buildApiUrl } from "./buildApiUrl";
import { Tag, TagsResponse } from "./types";

const getTags = async (
  username: string,
  repository: string,
  page: number = TAGS_PAGE_DEFAULT,
  perPage: number = TAGS_PER_PAGE_DEFAULT
): Promise<TagsResponse> => {
  const requestUrl = buildApiUrl(
    `repositories/${username}/${repository}/tags?page_size=${perPage}&page=${page}`
  );
  return makeGetRequest<TagsResponse>(requestUrl);
};

dayjs.extend(utc);

const getAllTags = async (
  username: string,
  repository: string
): Promise<Tag[]> => {
  const firstResponse = await getTags(username, repository, TAGS_PAGE_DEFAULT);
  const pagedResponses: TagsResponse[] = [];

  if (firstResponse.count > TAGS_PER_PAGE_DEFAULT) {
    const jobs: Promise<TagsResponse>[] = [];
    const pages = Math.ceil(firstResponse.count / TAGS_PER_PAGE_DEFAULT);
    for (let index = TAGS_PAGE_DEFAULT + 1; index <= pages; index++) {
      jobs.push(getTags(username, repository, index));
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
      dayjs.utc(b.tag_last_pushed).valueOf() -
      dayjs.utc(a.tag_last_pushed).valueOf()
    );
  });

  return mergedTags;
};

export { getTags, getAllTags };
