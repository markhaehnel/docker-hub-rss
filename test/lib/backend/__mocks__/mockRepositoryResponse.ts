import { RepositoryResponse } from "../../../../src/lib/backend/api/types";

const mockRepositoryResponse: RepositoryResponse = {
  can_edit: false,
  collaborator_count: 1,
  description: "prometheus description",
  full_description: "full prometheus description",
  has_starred: false,
  hub_user: "prom",
  is_automated: false,
  is_migrated: false,
  is_private: false,
  last_updated: new Date(2022, 1, 1, 12, 30, 15),
  name: "prometheus",
  namespace: "prom",
  permissions: {
    admin: false,
    read: false,
    write: false,
  },
  pull_count: 100,
  repository_type: "someType",
  star_count: 3,
  status: 0,
  user: "prom",
};

export { mockRepositoryResponse };
