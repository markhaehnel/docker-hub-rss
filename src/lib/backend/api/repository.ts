import { makeGetRequest } from "./makeGetRequest";
import { buildApiUrl } from "./buildApiUrl";
import { RepositoryResponse } from "./types";

const getRepository = async (
  username: string,
  repository: string
): Promise<RepositoryResponse> => {
  const requestUrl = buildApiUrl(`repositories/${username}/${repository}`);

  return makeGetRequest<RepositoryResponse>(requestUrl);
};

export { getRepository };
