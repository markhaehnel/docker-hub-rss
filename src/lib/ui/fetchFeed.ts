import X2JS from "x2js";
import { HttpError } from "../shared/error";
import { FeedResponse } from "./types";

const fetchFeed = async (feedUrl: string): Promise<FeedResponse> => {
  const response = await fetch(feedUrl);
  if (!response.ok) {
    const error = await response.json();
    throw new HttpError(error.message, error.status);
  }
  const body = await response.text();
  return new X2JS().xml2js(body);
};

export { fetchFeed };
