import X2JS from "x2js";
import { FeedResponse } from "./types";

export type DockerHubFilterParams = {
  username: string;
  repository: string;
  include?: string;
  exclude?: string;
  includeRegex?: string;
  excludeRegex?: string;
};

const buildUrl = ({
  username,
  repository,
  include,
  exclude,
  includeRegex,
  excludeRegex,
}: DockerHubFilterParams): string => {
  // if (!username) throw new Error("'username' cannot be empty");
  // if (!repository) throw new Error("'repository' cannot be empty");

  const url = new URL(
    `${window.location.origin}/${username || "_"}/${repository}.atom`
  );

  if (include) url.searchParams.append("include", include);
  if (exclude) url.searchParams.append("exclude", exclude);
  if (includeRegex) url.searchParams.append("includeRegex", includeRegex);
  if (excludeRegex) url.searchParams.append("excludeRegex", excludeRegex);

  return url.toString();
};

const extractFilterParamsFromHashString = (
  hash: string
): DockerHubFilterParams | null => {
  if (!hash && hash !== "") return null;
  const filteredHash = Buffer.from(hash.replace("#", ""), "base64").toString();
  console.log({ filteredHash });
  return JSON.parse(filteredHash) as DockerHubFilterParams;
};

const fetchFeed = async (feedUrl: string): Promise<FeedResponse> => {
  const response = await fetch(feedUrl);
  if (response.status >= 400) throw new Error("Failed to fetch feed");
  const body = await response.text();
  return new X2JS().xml2js(body);
};

export { buildUrl, extractFilterParamsFromHashString, fetchFeed };
