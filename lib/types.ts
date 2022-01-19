type FeedResponse = {
  rss: {
    channel: {
      title: string;
      description: string;
      item: {
        title: string;
        description: string;
        link: string;
        pubDate: string;
        guid: {
          __text: string;
        };
      }[];
    };
  };
};

type Tag = {
  creator: number;
  id: number;
  image_id: number | null;
  images: Image[];
  last_updated: string; //"2020-09-01T11:04:04.4838Z";
  last_updater: number;
  last_updater_username: string;
  name: string;
  repository: number;
  full_size: number;
  v2: boolean;
  tag_status: string;
  tag_last_pulled: string; //"2022-01-07T06:43:04.663439Z";
  tag_last_pushed: string; //"2020-09-01T11:04:04.4838Z";
};

type Image = {
  architecture: string; //"amd64"
  features: string;
  variant: null;
  digest: string; //"sha256:1e9832c318d66b1594a1196e7be0559a1e6409ffa4094d31063a0722fd7c256d";
  os: string; //"linux";
  os_features: string;
  os_version: null;
  size: number;
  status: "active" | "inactive";
  last_pulled: null;
  last_pushed: null;
};

export type { FeedResponse, Tag, Image };
