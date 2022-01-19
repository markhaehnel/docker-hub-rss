import dockerHubAPI from "docker-hub-api";
import { NextApiRequest, NextApiResponse } from "next";
import RSS from "rss";
import { Tag } from "../../../lib/types";

const getAllTags = async (username: string, repository: string) =>
  getTagsRecursive(username, repository, 1, []);

const getTagsRecursive = async (
  username: string,
  repository: string,
  page: number,
  tags: Tag[]
): Promise<Tag[]> => {
  const tagsPage = await dockerHubAPI.tags(username, repository, {
    page,
  });
  if ((tagsPage.results || tagsPage).length === 0) {
    return Promise.resolve(tags);
  }
  return getTagsRecursive(
    username,
    repository,
    page + 1,
    tags.concat(tagsPage.results || tagsPage)
  );
};

const formatRSS = (
  repo: { name: string; user: string; description: string },
  user: { gravatar_url: string },
  tags: Tag[]
) => {
  const feed = new RSS({
    title: repo.user + "/" + repo.name + " | Docker Hub Images",
    description: repo.description,
    site_url: "https://hub.docker.com/r/" + repo.user + "/" + repo.name,
    image_url: user.gravatar_url,
    feed_url: "",
  });
  tags.forEach((tag) => {
    feed.item({
      title: repo.user + "/" + repo.name + ":" + tag.name,
      description: repo.name,
      url:
        "https://hub.docker.com/r/" +
        repo.user +
        "/" +
        repo.name +
        "/tags?name=" +
        tag.name,
      guid: tag.id + "-" + new Date(tag.last_updated).getTime(),
      date: new Date(tag.last_updated),
    });
  });
  return feed.xml();
};

const getFeed = async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username as string;
  const repository = (req.query.repository as string).replace(".atom", "");
  const include = req.query.include
    ? (req.query.include as string).split(",")
    : [];
  const includeRegex = req.query.includeRegex as string;
  const exclude = req.query.exclude
    ? (req.query.exclude as string).split(",")
    : [];
  const excludeRegex = req.query.excludeRegex as string;

  if (!username || !repository) {
    return res.status(404).send("Not found");
  }
  try {
    const repo = await dockerHubAPI.repository(username, repository);
    const user = await dockerHubAPI.user(username);
    const images: any = await getAllTags(username, repository);
    const filtered = images.filter((image: { name: string }) => {
      return (
        (include.length === 0 || include.indexOf(image.name) !== -1) &&
        (exclude.length === 0 || exclude.indexOf(image.name) === -1) &&
        (!includeRegex || image.name.match(new RegExp(includeRegex))) &&
        (!excludeRegex || !image.name.match(new RegExp(excludeRegex)))
      );
    });
    res.setHeader("Content-Type", "text/xml");
    res.send(formatRSS(repo, user, filtered));
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};

export default getFeed;
