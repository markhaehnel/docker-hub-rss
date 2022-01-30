import { DockerHubFilterParams as DockerHubFilterParameters } from "./types";

const buildUrl = ({
  username,
  repository,
  include,
  exclude,
  includeRegex,
  excludeRegex,
}: DockerHubFilterParameters): string => {
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

export { buildUrl };
