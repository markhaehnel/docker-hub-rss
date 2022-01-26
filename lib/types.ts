type FeedResponseItem = {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: {
    __text: string;
  };
};

type FeedResponse = {
  rss: {
    channel: {
      title: string;
      description: string;
      item: FeedResponseItem | FeedResponseItem[];
    };
  };
};

type DockerHubFilterParams = {
  username: string;
  repository: string;
  include?: string;
  exclude?: string;
  includeRegex?: string;
  excludeRegex?: string;
};

export type { FeedResponse, DockerHubFilterParams };
