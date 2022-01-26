import { buildUrl, makeGetRequest } from "./base";
import { RepositoryResponse } from "./types";

const getRepository = async (
  username: string,
  repository: string
): Promise<RepositoryResponse> => {
  const requestUrl = buildUrl(`repositories/${username}/${repository}`);

  return makeGetRequest<RepositoryResponse>(requestUrl);
};

export { getRepository };
