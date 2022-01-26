import { HttpError } from "../error";

const API_BASE_URL = "https://hub.docker.com";
const API_VERSION = "v2";

const TAGS_PAGE_DEFAULT = 1;
const TAGS_PER_PAGE_DEFAULT = 100;

const makeGetRequest = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) throw new HttpError(response.statusText, response.status);

  return response.json() as Promise<T>;
};

const buildUrl = (path: string): string => {
  return `${API_BASE_URL}/${API_VERSION}/${path}`;
};

export {
  buildUrl,
  makeGetRequest,
  TAGS_PAGE_DEFAULT,
  TAGS_PER_PAGE_DEFAULT,
  API_VERSION,
  API_BASE_URL,
};
