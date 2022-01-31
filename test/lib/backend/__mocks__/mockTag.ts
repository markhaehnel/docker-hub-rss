import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Tag } from "../../../../src/lib/backend/api/types";

dayjs.extend(utc);

const getMockTag = (name: string = "latest", dayOffset: number = 0): Tag => {
  const date = dayjs
    .utc(`2022-02-01T12:30:45.00000Z`)
    .date(1 + dayOffset)
    .toISOString();

  return {
    creator: 0,
    id: 0,
    images: [],
    last_updated: date,
    last_updater: 0,
    last_updater_username: "docker-hub-rss-bot",
    name: name,
    repository: 0,
    full_size: 0,
    v2: true,
    tag_status: "active",
    tag_last_pulled: date,
    tag_last_pushed: date,
  };
};

const getMockTags = () => [
  getMockTag("latest", 10),
  getMockTag("dev", 12),
  getMockTag("v2.6.0", 7),
  getMockTag("v2.6.0-windowsservercore", 7),
  getMockTag("v2.5.2", 6),
  getMockTag("v2.5.2-windowsservercore", 6),
  getMockTag("v2.5.1", 5),
  getMockTag("v2.5.1-windowsservercore", 5),
  getMockTag("v2.5.0", 4),
  getMockTag("v2.5.0-windowsservercore", 4),
  getMockTag("v1.6.0", 3),
  getMockTag("v1.6.0-rc2", 2),
  getMockTag("v1.6.0-rc1", 1),
  getMockTag("v1.6.0-beta1", 0),
];

export { getMockTag, getMockTags };
