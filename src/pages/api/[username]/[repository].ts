import { NextApiRequest, NextApiResponse } from "next";
import { HttpError } from "../../../lib/shared/error";
import { formatRss } from "../../../lib/backend/formatRss";
import { getFilteredTags } from "../../../lib/backend/getFilteredTags";
import { parseQuery } from "../../../lib/ui/parseQuery";
import { logError } from "../../../lib/backend/logger";

const getFeed = async (request: NextApiRequest, response: NextApiResponse) => {
  const { username, repository, include, exclude, includeRegex, excludeRegex } =
    parseQuery(request.query);

  if (!username || !repository) {
    return response
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

    response.setHeader("Content-Type", "text/xml");
    response.send(formatRss(repo, tags));
  } catch (error: any) {
    logError(error);

    if (error instanceof HttpError) {
      return response
        .status(error.statusCode)
        .json({ status: error.statusCode, message: error.message });
    }

    return response
      .status(500)
      .json({ status: error.status, message: error.message });
  }
};

export default getFeed;
