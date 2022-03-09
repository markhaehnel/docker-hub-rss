import { API_BASE_URL, API_VERSION } from "./base";

const buildApiUrl = (path: string): string => {
  return `${API_BASE_URL}/${API_VERSION}/${path}`;
};

export { buildApiUrl };
