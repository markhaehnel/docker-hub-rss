import { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "../../../lib/error";
import { formatRss } from "../../../lib/formatRss";
import { getFilteredTags } from "../../../lib/getFilteredTags";
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
  } catch (ex: any) {
    console.error(ex);

    if (ex instanceof HttpError) {
      return res
        .status(ex.statusCode)
        .json({ status: ex.statusCode, message: ex.message });
    }

    return res.status(500).json({ status: ex.status, message: ex.message });
  }
};

export default getFeed;
