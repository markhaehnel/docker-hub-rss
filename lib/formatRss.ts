import RSS from "rss";
import { RepositoryResponse, Tag } from "./api/types";
import { API_BASE_URL } from "./api/api";

const formatRss = (repository: RepositoryResponse, tags: Tag[]) => {
  const { user, name: repoName, description } = repository;

  const userAndRepo = `${user}/${repoName}`;
  const repoBaseUrl = `${API_BASE_URL}/r/${userAndRepo}`;

  const feed = new RSS({
    title: `${userAndRepo} | Docker Hub Images`,
    description,
    site_url: repoBaseUrl,
    feed_url: "",
  });

  for (const { id, name: tagName, last_updated } of tags) {
    const lastUpdated = new Date(last_updated);
    feed.item({
      title: `${userAndRepo}:${tagName}`,
      description: repoName,
      url: `${repoBaseUrl}/tags?name=${tagName}`,
      guid: `${id}-${lastUpdated.getTime()}`,
      date: lastUpdated,
    });
  }

  return feed.xml();
};

export { formatRss };
