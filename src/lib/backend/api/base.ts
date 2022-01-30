import { HttpError } from "../../shared/error";
import superagent from "superagent";

const API_BASE_URL = "https://hub.docker.com";
const API_VERSION = "v2";

const TAGS_PAGE_DEFAULT = 1;
const TAGS_PER_PAGE_DEFAULT = 100;

const makeGetRequest = async <T>(url: string): Promise<T> => {
  try {
    const response = await superagent.get(url).retry(2);
    return JSON.parse(response.text) as Promise<T>;
  } catch (error: any) {
    throw new HttpError(error.text, error.status);
  }
};

const buildApiUrl = (path: string): string => {
  return `${API_BASE_URL}/${API_VERSION}/${path}`;
};

export {
  buildApiUrl,
  makeGetRequest,
  TAGS_PAGE_DEFAULT,
  TAGS_PER_PAGE_DEFAULT,
  API_VERSION,
  API_BASE_URL,
};
