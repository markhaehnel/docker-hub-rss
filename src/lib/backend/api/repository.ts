import { buildApiUrl, makeGetRequest } from "./base";
import { RepositoryResponse } from "./types";

const getRepository = async (
  username: string,
  repository: string
): Promise<RepositoryResponse> => {
  const requestUrl = buildApiUrl(`repositories/${username}/${repository}`);

  return makeGetRequest<RepositoryResponse>(requestUrl);
};

export { getRepository };
