type Image = {
  architecture: string;
  features: string;
  variant: string;
  digest: string;
  os: string;
  os_features: string;
  os_version: string;
  size: number;
  status: string;
  last_pulled: Date;
  last_pushed: Date;
};

type Tag = {
  creator: number;
  id: number;
  image_id?: string;
  images: Image[];
  last_updated: Date;
  last_updater: number;
  last_updater_username: string;
  name: string;
  repository: number;
  full_size: number;
  v2: boolean;
  tag_status: string;
  tag_last_pulled: Date;
  tag_last_pushed: Date;
};

type TagsResponse = {
  count: number;
  next: string;
  previous: string;
  results: Tag[];
};

type RepositoryResponse = {
  affiliation?: any;
  can_edit: boolean;
  collaborator_count: number;
  description: string;
  full_description: string;
  has_starred: boolean;
  hub_user: string;
  is_automated: boolean;
  is_migrated: boolean;
  is_private: boolean;
  last_updated: Date;
  name: string;
  namespace: string;
  permissions: {
    admin: boolean;
    read: boolean;
    write: boolean;
  };
  pull_count: number;
  repository_type: string;
  star_count: number;
  status: number;
  user: string;
};

export type { TagsResponse, RepositoryResponse, Tag, Image };
