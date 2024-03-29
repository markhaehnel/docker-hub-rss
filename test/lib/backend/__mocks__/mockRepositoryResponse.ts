import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { RepositoryResponse } from "../../../../src/lib/backend/api/types";

dayjs.extend(utc);

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
  last_updated: "2022-02-01T12:30:45.00000Z",
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
