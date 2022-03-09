import { HttpError } from "../../shared/error";
import superagent from "superagent";
import { getCachedValue } from "../getCachedValue";
import { logDebug } from "../logger";

const makeGetRequest = async <T>(url: string): Promise<T> => {
  try {
    logDebug(`Getting ${url}`);
    const result = await getCachedValue<T>(url, async () => {
      logDebug(`fetchFunction running`);

      const response = await superagent.get(url).retry(2);
      return JSON.parse(response.text) as Promise<T>;
    });

    return result;
  } catch (error: any) {
    throw new HttpError(error.text, error.status);
  }
};

export { makeGetRequest };
