import X2JS from "x2js";
import { HttpError } from "./error";
import { DockerHubFilterParams, FeedResponse } from "./types";

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

const fetchFeed = async (feedUrl: string): Promise<FeedResponse> => {
  const response = await fetch(feedUrl);
  if (!response.ok) {
    const error = await response.json();
    throw new HttpError(error.message, error.status);
  }
  const body = await response.text();
  return new X2JS().xml2js(body);
};

export { buildUrl, fetchFeed };
