import { NextApiRequest, NextApiResponse } from "next";
import { getFilteredTags } from "../../../lib/api/api";
import { formatRss } from "../../../lib/formatRss";
import { parseQuery } from "../../../lib/parseQuery";

const getFeed = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, repository, include, exclude, includeRegex, excludeRegex } =
    parseQuery(req.query);

  if (!username || !repository) {
    return res
      .status(400)
      .json({ message: "username and repository need to be set" });
  }

  const normalizedUsername = username === "_" ? "library" : username;

  try {
    const { repo, tags } = await getFilteredTags(
      normalizedUsername,
      repository,
      include,
      exclude,
      includeRegex,
      excludeRegex
    );

    res.setHeader("Content-Type", "text/xml");
    res.send(formatRss(repo, tags));
  } catch (e: any) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

export default getFeed;
